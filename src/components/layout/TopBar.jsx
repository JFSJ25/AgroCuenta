import { CheckCircle, MoreHoriz, Spa } from '@mui/icons-material'

export function TopBar({ onMenu }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">
          <Spa />
        </span>
        <span>
          Agro<strong>Cuenta</strong>
        </span>
      </div>
      <div className="device-note">
        <CheckCircle fontSize="small" /> Tus datos se guardan en este
        dispositivo
      </div>
      <button
        className="icon-button"
        aria-label="Más opciones"
        onClick={onMenu}
      >
        <MoreHoriz />
      </button>
    </header>
  )
}
