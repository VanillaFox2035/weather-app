import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  current: string;
  places: string[];
  onSelect: (place: string) => void;
  onClose: () => void;
}

// Native <dialog>: focus trapping, Esc to close and the backdrop come for free.
export default function LocationSheet({ open, current, places, onSelect, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      <div className="sheet-body">
        <h2>Choose a location</h2>
        {places.length === 0 ? (
          <p className="empty">The location list didn’t load. Close this and try again in a moment.</p>
        ) : (
          <ul>
            {places.map((p) => (
              <li key={p}>
                <button aria-current={p === current} onClick={() => onSelect(p)}>{p}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
