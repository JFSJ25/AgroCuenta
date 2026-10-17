import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Modal } from '../common/Modal'

export function RegisterChooser({ onClose, onSelect }) {
  return (
    <Modal title="¿Qué quieres registrar?" onClose={onClose}>
      <div className="chooser">
        <button onClick={() => onSelect('expense')}>
          <span className="chooser-icon expense">
            <ArrowDownward />
          </span>
          <span>
            <strong>Un gasto</strong>
            <small>Semillas, jornales, transporte...</small>
          </span>
        </button>
        <button onClick={() => onSelect('sale')}>
          <span className="chooser-icon income">
            <ArrowUpward />
          </span>
          <span>
            <strong>Una venta</strong>
            <small>Producto, cantidad y precio</small>
          </span>
        </button>
      </div>
    </Modal>
  )
}
