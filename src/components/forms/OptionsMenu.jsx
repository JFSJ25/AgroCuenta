import { Agriculture, Download, Upload } from '@mui/icons-material'
import { Modal } from '../common/Modal'

export function OptionsMenu({ onClose, onNavigate, onExport, onImport }) {
  return (
    <Modal title="Más opciones" onClose={onClose}>
      <div className="options-list">
        <button
          onClick={() => {
            onNavigate('production')
            onClose()
          }}
        >
          <Agriculture />
          <span>
            <strong>Ver producción</strong>
            <small>Revisa costos y resultados por cultivo</small>
          </span>
        </button>
        <button onClick={onExport}>
          <Download />
          <span><strong>Exportar respaldo</strong><small>Descarga tus datos en un archivo JSON</small></span>
        </button>
        <label className="options-file-button">
          <Upload />
          <span><strong>Importar respaldo</strong><small>Restaura datos desde un archivo JSON</small></span>
          <input type="file" accept="application/json,.json" onChange={event => onImport(event.target.files?.[0])} />
        </label>
      </div>
    </Modal>
  )
}
