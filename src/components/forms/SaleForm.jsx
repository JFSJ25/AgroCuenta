import { useState } from 'react'
import { Modal } from '../common/Modal'
import { money, TODAY } from '../../utils/formatters'

const units = [
  'kg',
  'quintal',
  'saco',
  'caja',
  'unidad',
  'libra',
  'tonelada',
  'litro'
]
const paymentMethods = ['Efectivo', 'Transferencia', 'Crédito', 'Otro']

export function SaleForm({ crops, onClose, onSave }) {
  const [form, setForm] = useState({
    description: '',
    crop: crops[0]?.name || '',
    quantity: '',
    unit: 'kg',
    price: '',
    buyer: '',
    paymentMethod: 'Efectivo',
    date: TODAY
  })
  const update = event =>
    setForm({ ...form, [event.target.name]: event.target.value })
  const total = (Number(form.quantity) || 0) * (Number(form.price) || 0)
  return (
    <Modal title="Registrar venta" onClose={onClose}>
      <form
        className="modal-form"
        onSubmit={event => {
          event.preventDefault()
          onSave({
            ...form,
            type: 'income',
            category: 'Venta',
            description: `Venta de ${form.description}`,
            amount: total,
            detail: `${form.quantity} ${form.unit} · ${money(Number(form.price) || 0)}/${form.unit}`
          })
        }}
      >
        <label>
          Producto
          <input
            name="description"
            placeholder="Ej. Cacao"
            value={form.description}
            onChange={update}
            required
          />
        </label>
        <label>
          Cultivo relacionado
          <select name="crop" value={form.crop} onChange={update} required>
            {crops.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
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
          Precio por unidad
          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="$ 0.00"
            value={form.price}
            onChange={update}
            required
          />
        </label>
        <div className="sale-total">
          <span>Total de la venta</span>
          <strong>{money(total)}</strong>
        </div>
        <label>
          Comprador <span className="optional">(opcional)</span>
          <input
            name="buyer"
            placeholder="Ej. Mercado local"
            value={form.buyer}
            onChange={update}
          />
        </label>
        <label>
          Método de pago
          <select name="paymentMethod" value={form.paymentMethod} onChange={update} required>
            {paymentMethods.map(method => <option key={method}>{method}</option>)}
          </select>
        </label>
        <label>
          Fecha
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={update}
            required
          />
        </label>
        <button
          className="primary-button form-submit"
          type="submit"
          disabled={!total}
        >
          Guardar venta
        </button>
      </form>
    </Modal>
  )
}
