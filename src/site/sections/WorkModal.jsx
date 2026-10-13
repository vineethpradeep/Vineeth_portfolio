import { useEffect, useRef } from "react";
import { lockScroll } from "../motion";
import { BrowserFrame, DigitalButton } from "../ui";

// Project details shown before leaving for the live site. Native <dialog> handles focus and Escape.
export default function WorkModal({ item, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (item && !dialog.open) {
      dialog.showModal();
      lockScroll(true);
    }
    return () => lockScroll(false);
  }, [item]);

  const close = () => {
    ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      className="work-modal"
      data-lenis-prevent
      aria-labelledby="work-modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
    >
      {item && (
        <div className="work-modal-inner">
          <div className="work-modal-media">
            <BrowserFrame src={item.image} url={item.url} alt={`${item.title} homepage`} loading="eager" />
          </div>
          <div className="work-modal-body">
            <div className="work-modal-head">
              <p className="label">Selected work</p>
              <button type="button" className="work-modal-close" onClick={close}>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <h2 id="work-modal-title" className="work-modal-title">
              {item.title}
            </h2>
            <ul className="work-modal-tags" aria-label="Built with">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="work-modal-text">{item.description}</p>
            <DigitalButton label="Visit live site" href={item.url} className="work-modal-visit" cursor="Visit" />
          </div>
        </div>
      )}
    </dialog>
  );
}
