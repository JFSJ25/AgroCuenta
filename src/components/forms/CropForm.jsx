import { useState } from 'react'
import { Modal } from '../common/Modal'
import { TODAY } from '../../utils/formatters'

const areaUnits = ['hectáreas', 'metros cuadrados']

export function CropForm({ initialCrop, onClose, onSave }) {
  const [form, setForm] = useState(initialCrop || {
    name: '',
    area: '',
    areaUnit: 'hectáreas',
    plantingDate: TODAY,
    expectedProduction: '',
    actualProduction: ''
  })
  const update = event => setForm({ ...form, [event.target.name]: event.target.value })
  return <Modal title={initialCrop ? 'Editar cultivo' : 'Agregar cultivo'} onClose={onClose}><form className="modal-form" onSubmit={event => { event.preventDefault(); onSave({ ...form, area: Number(form.area), expectedProduction: Number(form.expectedProduction), actualProduction: Number(form.actualProduction) }) }}><label>Nombre del cultivo<input name="name" placeholder="Ej. Cacao" value={form.name} onChange={update} required /></label><div className="two-fields"><label>Área cultivada<input name="area" type="number" min="0.01" step="0.01" value={form.area} onChange={update} required /></label><label>Unidad de área<select name="areaUnit" value={form.areaUnit} onChange={update}>{areaUnits.map(unit => <option key={unit}>{unit}</option>)}</select></label></div><label>Fecha de siembra<input name="plantingDate" type="date" value={form.plantingDate} onChange={update} required /></label><div className="two-fields"><label>Producción esperada<input name="expectedProduction" type="number" min="0" step="0.01" value={form.expectedProduction} onChange={update} required /></label><label>Producción real<input name="actualProduction" type="number" min="0" step="0.01" value={form.actualProduction} onChange={update} required /></label></div><button className="primary-button form-submit" type="submit">{initialCrop ? 'Guardar cambios' : 'Guardar cultivo'}</button></form></Modal>
}
