import { useState } from 'react'
import { Modal } from '../common/Modal'
import { TODAY } from '../../utils/formatters'

const units = ['kg', 'quintal', 'sacos', 'cajas', 'unidades']

export function ProductionForm({ crops, onClose, onSave }) {
  const [form, setForm] = useState({
    crop: crops[0]?.name || '',
    quantity: '',
    unit: 'kg',
    date: TODAY,
    lot: ''
  })
  const update = event =>
    setForm({ ...form, [event.target.name]: event.target.value })
  return (
    <Modal title="Registrar producción" onClose={onClose}>
      <form
        className="modal-form"
        onSubmit={event => {
          event.preventDefault()
          onSave({ ...form, quantity: Number(form.quantity) })
        }}
      >
        <label>
          Cultivo
          <select name="crop" value={form.crop} onChange={update}>
            {crops.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <div className="two-fields">
          <label>
            Cantidad
            <input
              name="quantity"
              type="number"
              min="0.01"
              step="0.01"
              value={form.quantity}
              onChange={update}
              required
            />
          </label>
          <label>
            Unidad
            <select name="unit" value={form.unit} onChange={update}>
              {units.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Fecha de cosecha
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={update}
            required
          />
        </label>
        <label>
          Lote <span className="optional">(opcional)</span>
          <input
            name="lot"
            placeholder="Ej. C-002"
            value={form.lot}
            onChange={update}
          />
        </label>
        <button className="primary-button form-submit" type="submit">
          Guardar producción
        </button>
      </form>
    </Modal>
  )
}
