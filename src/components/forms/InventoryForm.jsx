import { useState } from 'react'
import { Modal } from '../common/Modal'

const units = ['sacos', 'litros', 'kg', 'cajas', 'unidades']

export function InventoryForm({ onClose, onSave, initialItem }) {
  const [form, setForm] = useState(
    initialItem || {
      name: '',
      quantity: '',
      unit: 'sacos',
      minimum: '',
      cost: ''
    }
  )
  const update = event =>
    setForm({ ...form, [event.target.name]: event.target.value })
  return (
    <Modal
      title={initialItem ? 'Editar insumo' : 'Agregar insumo'}
      onClose={onClose}
    >
      <form
        className="modal-form"
        onSubmit={event => {
          event.preventDefault()
          onSave({
            ...form,
            quantity: Number(form.quantity),
            minimum: Number(form.minimum),
            cost: Number(form.cost)
          })
        }}
      >
        <label>
          Nombre del insumo
          <input
            name="name"
            placeholder="Ej. Semillas de cacao"
            value={form.name}
            onChange={update}
            required
          />
        </label>
        <div className="two-fields">
          <label>
            Cantidad
            <input
              name="quantity"
              type="number"
              min="0"
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
        <div className="two-fields">
          <label>
            Stock mínimo
            <input
              name="minimum"
              type="number"
              min="0"
              value={form.minimum}
              onChange={update}
              required
            />
          </label>
          <label>
            Costo aproximado
            <input
              name="cost"
              type="number"
              min="0"
              step="0.01"
              value={form.cost}
              onChange={update}
              required
            />
          </label>
        </div>
        <button className="primary-button form-submit" type="submit">
          {initialItem ? 'Guardar cambios' : 'Agregar insumo'}
        </button>
      </form>
    </Modal>
  )
}
