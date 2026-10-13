import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { profile } from "../content";
import { CONSULTATION_OPTIONS as OPTIONS, ROLE_STAGES } from "../consultationOptions";
import { lockScroll } from "../motion";
import { DigitalButton } from "../ui";

const ConsultationContext = createContext(() => {});

export const useConsultation = () => useContext(ConsultationContext);

const EMPTY = {
  name: "",
  email: "",
  company: "",
  phone: "",
  stage: "",
  jobTitle: "",
  arrangement: "",
  rate: "",
  jobLink: "",
  services: [],
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

const STEPS = [
  { title: "Share the opportunity", text: "The role, contract or project, and the problem it needs to solve." },
  { title: "We talk it through", text: "A short call about the team, scope, stack and timeline." },
  { title: "Next steps", text: "An interview slot, or a clear proposal with scope, timeline and cost." },
]

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (form.message.trim().length < 10)
    errors.message =
      "Please share a little about the role or project (10+ characters).";
  if (ROLE_STAGES.includes(form.stage)) {
    if (!form.jobTitle.trim()) errors.jobTitle = "Please add the job title.";
    if (form.jobLink.trim() && !/^https?:\/\/\S+$/.test(form.jobLink.trim()))
      errors.jobLink = "Please enter a full link starting with https://";
  }
  return errors;
}

// Only send the fields that apply to the chosen engagement type.
function payload(form) {
  const role = ROLE_STAGES.includes(form.stage);
  return {
    ...form,
    jobTitle: role ? form.jobTitle : "",
    arrangement: role ? form.arrangement : "",
    rate: role ? form.rate : "",
    jobLink: role ? form.jobLink : "",
    services: role ? [] : form.services,
    budget: role ? "" : form.budget,
  };
}

// Single-choice row of pill options, keyboard accessible as a radio group.
function ChoiceGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="choices">
      <legend>{legend}</legend>
      <div className="choices-list">
        {options.map((option) => (
          <label
            key={option}
            className={`choice ${value === option ? "is-selected" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ConsultationDialog({ open, onClose }) {
  const ref = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const isRole = ROLE_STAGES.includes(form.stage);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector('[name="name"]')?.focus();
      lockScroll(true);
    }
    return () => lockScroll(false);
  }, [open]);

  const close = () => ref.current.close();

  const handleClose = () => {
    if (status === "sent") {
      setForm(EMPTY);
      setStatus("idle");
    }
    onClose();
  };

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };
  const onInput = (field) => (e) => set(field)(e.target.value);

  const toggleService = (service) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      ref.current.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload(form)),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success) {
        setStatus("sent");
      } else {
        if (result.errors) setErrors(result.errors);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldError = (field) =>
    errors[field] && (
      <span className="field-error" id={`${field}-error`} role="alert">
        {errors[field]}
      </span>
    );
  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <dialog
      ref={ref}
      className="consult"
      data-lenis-prevent
      aria-labelledby="consult-title"
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && close()}
    >
      <div className="consult-inner">
        <aside className="consult-side">
          <p className="chip chip-light">
            <span className="chip-index">(08)</span>Hire me
          </p>
          <h2 id="consult-title" className="consult-title">
            Let&apos;s work <em className="accent">together</em>
          </h2>
          <p className="consult-lead">
            Hiring an architect or full-stack and AI developer, or planning a
            project? Tell me about it. I&apos;ll reply personally to every enquiry.
          </p>
          <ol className="consult-steps">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="consult-step-index">0{i + 1}</span>
                <span>
                  <strong>{step.title}</strong>
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
          <p className="consult-direct">
            Prefer email?{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </aside>

        <div className="consult-main">
          <div className="consult-head">
            <p className="label">Hire me</p>
            <button type="button" className="work-modal-close" onClick={close}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="consult-scroll">
            {status === "sent" ? (
              <div className="consult-done" role="status">
                <span className="consult-done-mark" aria-hidden="true">
                  ✓
                </span>
                <h3>Thank you, {form.name.split(" ")[0]}.</h3>
                <p>
                  Your request is on its way. I&apos;ll be in touch at{" "}
                  {form.email} to arrange a discovery call.
                </p>
                <DigitalButton label="Back to the site" onClick={close} />
              </div>
            ) : (
              <form className="consult-form" onSubmit={submit} noValidate>
                <div className="field-row">
                  <label className={`field ${errors.name ? "has-error" : ""}`}>
                    <span>Name *</span>
                    <input
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={onInput("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={describedBy("name")}
                    />
                    {fieldError("name")}
                  </label>
                  <label className={`field ${errors.email ? "has-error" : ""}`}>
                    <span>Email *</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={onInput("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={describedBy("email")}
                    />
                    {fieldError("email")}
                  </label>
                </div>
                <div className="field-row">
                  <label className="field">
                    <span>Company</span>
                    <input
                      name="company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={onInput("company")}
                    />
                  </label>
                  <label className="field">
                    <span>Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={onInput("phone")}
                    />
                  </label>
                </div>

                <ChoiceGroup
                  legend="How would you like to work together?"
                  name="stage"
                  options={OPTIONS.stage}
                  value={form.stage}
                  onChange={set("stage")}
                />

                {isRole ? (
                  <>
                    <div className="field-row">
                      <label className={`field ${errors.jobTitle ? "has-error" : ""}`}>
                        <span>Job title *</span>
                        <input
                          name="jobTitle"
                          value={form.jobTitle}
                          onChange={onInput("jobTitle")}
                          placeholder="e.g. Solutions Architect"
                          aria-invalid={!!errors.jobTitle}
                          aria-describedby={describedBy("jobTitle")}
                        />
                        {fieldError("jobTitle")}
                      </label>
                      <label className="field">
                        <span>{form.stage === "Contract role" ? "Day rate" : "Salary range"}</span>
                        <input
                          name="rate"
                          value={form.rate}
                          onChange={onInput("rate")}
                          placeholder={form.stage === "Contract role" ? "e.g. £450 / day" : "e.g. £60k – £75k"}
                        />
                      </label>
                    </div>
                    <div className="field-row">
                      <ChoiceGroup
                        legend="Work arrangement"
                        name="arrangement"
                        options={OPTIONS.arrangement}
                        value={form.arrangement}
                        onChange={set("arrangement")}
                      />
                      <label className={`field ${errors.jobLink ? "has-error" : ""}`}>
                        <span>Job description link</span>
                        <input
                          name="jobLink"
                          type="url"
                          value={form.jobLink}
                          onChange={onInput("jobLink")}
                          placeholder="https://"
                          aria-invalid={!!errors.jobLink}
                          aria-describedby={describedBy("jobLink")}
                        />
                        {fieldError("jobLink")}
                      </label>
                    </div>
                  </>
                ) : (
                  <fieldset className="choices">
                    <legend>What do you need from me?</legend>
                    <div className="choices-list">
                      {OPTIONS.services.map((service) => (
                        <label
                          key={service}
                          className={`choice ${form.services.includes(service) ? "is-selected" : ""}`}
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={service}
                            checked={form.services.includes(service)}
                            onChange={() => toggleService(service)}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                <div className="field-row">
                  {!isRole && (
                    <ChoiceGroup
                      legend="Budget"
                      name="budget"
                      options={OPTIONS.budget}
                      value={form.budget}
                      onChange={set("budget")}
                    />
                  )}
                  <ChoiceGroup
                    legend="Start date"
                    name="timeline"
                    options={OPTIONS.timeline}
                    value={form.timeline}
                    onChange={set("timeline")}
                  />
                </div>

                <label className={`field ${errors.message ? "has-error" : ""}`}>
                  <span>{isRole ? "Tell me about the role and team *" : "Tell me about the project *"}</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={onInput("message")}
                    placeholder={
                      isRole
                        ? "The team, the stack and what you need this person to deliver."
                        : "The product or problem, and what success would look like."
                    }
                    aria-invalid={!!errors.message}
                    aria-describedby={describedBy("message")}
                  />
                  {fieldError("message")}
                </label>

                <label className="honeypot" aria-hidden="true">
                  Website
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={onInput("website")}
                  />
                </label>

                {status === "error" && (
                  <p className="consult-error" role="alert">
                    Sorry, your request couldn&apos;t be sent. Please try again,
                    or email{" "}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                <div className="consult-actions">
                  <DigitalButton
                    type="submit"
                    label={status === "sending" ? "Sending…" : "Send enquiry"}
                    disabled={status === "sending"}
                  />
                  <p className="consult-note">
                    Your details are only used to reply to this request.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function ConsultationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openForm = useCallback(() => setOpen(true), []);
  return (
    <ConsultationContext.Provider value={openForm}>
      {children}
      <ConsultationDialog open={open} onClose={() => setOpen(false)} />
    </ConsultationContext.Provider>
  );
}
