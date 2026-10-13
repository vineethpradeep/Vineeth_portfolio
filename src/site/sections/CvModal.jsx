import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { profile } from "../content";
import { lockScroll } from "../motion";
import { ArrowIcon, DigitalButton } from "../ui";

const CvContext = createContext(() => {});

export const useCv = () => useContext(CvContext);

const DOWNLOAD_NAME = "Vineeth_Pradeep_CV.pdf";

function CvDialog({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) {
      dialog.showModal();
      lockScroll(true);
    }
    return () => lockScroll(false);
  }, [open]);

  const close = () => ref.current.close();

  return (
    <dialog
      ref={ref}
      className="cv"
      data-lenis-prevent
      aria-labelledby="cv-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
    >
      <header className="cv-head">
        <div>
          <p className="chip">
            <span className="chip-index">(CV)</span>Curriculum vitae
          </p>
          <h2 id="cv-title" className="cv-title">
            {profile.fullName}
            <span>{profile.role}</span>
          </h2>
        </div>
        <div className="cv-actions">
          <DigitalButton label="Download CV" href={profile.cv} download={DOWNLOAD_NAME} cursor="Download" />
          <a className="cv-open" href={profile.cv} target="_blank" rel="noopener noreferrer">
            Open in new tab <ArrowIcon />
          </a>
          <button type="button" className="work-modal-close" onClick={close}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
      </header>

      <div className="cv-body">
        {open && (
          <object className="cv-frame" data={`${profile.cv}#view=FitH`} type="application/pdf" aria-label="CV preview">
            <div className="cv-fallback">
              <p>Your browser can&apos;t show the PDF here.</p>
              <DigitalButton label="Download CV" href={profile.cv} download={DOWNLOAD_NAME} />
            </div>
          </object>
        )}
      </div>
    </dialog>
  );
}

export function CvProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openCv = useCallback(() => setOpen(true), []);
  return (
    <CvContext.Provider value={openCv}>
      {children}
      <CvDialog open={open} onClose={() => setOpen(false)} />
    </CvContext.Provider>
  );
}
