import { useState } from 'react'
import { Modal } from '../common/Modal'
import { TODAY } from '../../utils/formatters'

const categories = [
  'Semillas',
  'Fertilizantes',
  'Plaguicidas',
  'Mano de obra',
  'Transporte',
  'Riego',
  'Combustible',
  'Herramientas',
  'Maquinaria',
  'Empaque',
  'Alimentación',
  'Otros'
]
export function ExpenseForm({ crops, onClose, onSave }) {
  const [form, setForm] = useState({
    category: 'Fertilizantes',
    description: '',
    amount: '',
    crop: crops[0]?.name || '',
    date: TODAY
  })
  const update = event =>
    setForm({ ...form, [event.target.name]: event.target.value })
  return (
    <Modal title="Registrar gasto" onClose={onClose}>
      <form
        className="modal-form"
        onSubmit={event => {
          event.preventDefault()
          onSave({ ...form, type: 'expense', amount: Number(form.amount) })
        }}
      >
        <label>
          ¿En qué gastaste?
          <select name="category" value={form.category} onChange={update}>
            {categories.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Descripción
          <input
            name="description"
            placeholder="Ej. 4 sacos de fertilizante"
            value={form.description}
            onChange={update}
            required
          />
        </label>
        <label>
          Valor
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="$ 0.00"
            value={form.amount}
            onChange={update}
            required
          />
        </label>
        <label>
          Cultivo relacionado
          <select name="crop" value={form.crop} onChange={update}>
            {crops.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
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
        <button className="primary-button form-submit" type="submit">
          Guardar gasto
        </button>
      </form>
    </Modal>
  )
}
