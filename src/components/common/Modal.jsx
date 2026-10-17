import { Close } from '@mui/icons-material'

export function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar">
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
