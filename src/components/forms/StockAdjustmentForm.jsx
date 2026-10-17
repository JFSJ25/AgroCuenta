import { useState } from 'react'
import { Modal } from '../common/Modal'

export function StockAdjustmentForm({ item, direction, onClose, onSave }) {
  const [quantity, setQuantity] = useState('')
  const isEntry = direction === 'entry'
  return (
    <Modal
      title={`${isEntry ? 'Entrada' : 'Salida'} de inventario`}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={event => {
          event.preventDefault()
          onSave(Number(quantity))
        }}
      >
        <div className="stock-adjustment-copy">
          <strong>{item.name}</strong>
          <span>
            Stock actual: {item.quantity} {item.unit}
          </span>
        </div>
        <label>
          Cantidad
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
            required
            autoFocus
          />
        </label>
        <button className="primary-button form-submit" type="submit">
          {isEntry ? 'Registrar entrada' : 'Registrar salida'}
        </button>
      </form>
    </Modal>
  )
}
