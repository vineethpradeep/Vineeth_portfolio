import nodemailer from "nodemailer";
import { CONSULTATION_OPTIONS, ROLE_STAGES } from "../src/site/consultationOptions.js";

// Vercel serverless function (also mounted by server.js for local development).
// Emails a hire-me enquiry to MAIL_TO (or MAIL_USERNAME) using the MAIL_* environment variables.

const LIMITS = { name: 120, email: 200, company: 160, phone: 40, jobTitle: 120, rate: 80, jobLink: 500, message: 4000 };
const CHOICES = CONSULTATION_OPTIONS;

const escape = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export function validate(body = {}) {
  const data = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    company: clean(body.company, LIMITS.company),
    phone: clean(body.phone, LIMITS.phone),
    jobTitle: clean(body.jobTitle, LIMITS.jobTitle),
    rate: clean(body.rate, LIMITS.rate),
    jobLink: clean(body.jobLink, LIMITS.jobLink),
    arrangement: CHOICES.arrangement.includes(body.arrangement) ? body.arrangement : "",
    message: clean(body.message, LIMITS.message),
    stage: CHOICES.stage.includes(body.stage) ? body.stage : "",
    budget: CHOICES.budget.includes(body.budget) ? body.budget : "",
    timeline: CHOICES.timeline.includes(body.timeline) ? body.timeline : "",
    services: Array.isArray(body.services) ? body.services.filter((s) => CHOICES.services.includes(s)) : [],
  };
  const errors = {};
  if (!data.name) errors.name = "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.jobLink && !/^https?:\/\/\S+$/.test(data.jobLink)) errors.jobLink = "Please enter a full link starting with https://";
  if (ROLE_STAGES.includes(data.stage) && !data.jobTitle) errors.jobTitle = "Please add the job title.";
  if (data.message.length < 10) errors.message = "Please share a little about the role or project (10+ characters).";
  return { data, errors };
}

function renderEmail(d) {
  const rows = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company],
    ["Phone", d.phone],
    ["Engagement", d.stage],
    ["Job title", d.jobTitle],
    ["Work arrangement", d.arrangement],
    ["Salary / rate", d.rate],
    ["Job description", d.jobLink],
    ["Needs", d.services.join(", ")],
    ["Budget", d.budget],
    ["Start date", d.timeline],
  ].filter(([, v]) => v);
  const html = `
    <h2>New hire me enquiry</h2>
    <table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${escape(k)}</strong></td><td>${escape(v)}</td></tr>`)
      .join("")}</table>
    <h3>Message</h3>
    <p>${escape(d.message).replace(/\n/g, "<br/>")}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message}`;
  return { html, text };
}

// Sites allowed to call this function from the browser (the Netlify copy and local development).
const ALLOWED_ORIGINS = [
  "https://vineethjourney.vercel.app",
  "https://vineethjourney.netlify.app",
  "http://localhost:5173",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  // CORS preflight for JSON posts from the Netlify copy.
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Honeypot: real visitors never see or fill this field.
  if (body.website) return res.status(200).json({ success: true });

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) return res.status(400).json({ success: false, errors });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_ENCRYPTION === "ssl" || Number(process.env.MAIL_PORT) === 465,
      auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD },
    });
    const { html, text } = renderEmail(data);
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      // MAIL_TO lets enquiries go to a different inbox than the sending account.
      to: process.env.MAIL_TO || process.env.MAIL_USERNAME,
      replyTo: data.email,
      subject: `Hire me enquiry: ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text,
      html,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Consultation email failed:", err);
    return res.status(500).json({ success: false, error: "Email could not be sent" });
  }
}

