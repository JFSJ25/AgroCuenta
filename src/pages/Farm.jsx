import { Agriculture, CheckCircle, Edit } from '@mui/icons-material'
import { useState } from 'react'

const profileFields = [
  ['farm', 'Nombre de la finca'],
  ['producer', 'Nombre del productor'],
  ['province', 'Provincia'],
  ['canton', 'Cantón'],
  ['crops', 'Cultivos principales'],
  ['area', 'Área aproximada']
]

export function Farm({ data, saveData, onNavigate }) {
  const [profile, setProfile] = useState(data.profile)
  const [editing, setEditing] = useState(false)
  const update = event =>
    setProfile({ ...profile, [event.target.name]: event.target.value })
  const submit = event => {
    event.preventDefault()
    saveData({ ...data, profile })
    setEditing(false)
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Tu información</p>
          <h1>Mi finca</h1>
          <p className="muted">
            Estos datos solo se guardan en este dispositivo.
          </p>
        </div>
        {!editing && (
          <button className="outline-button" onClick={() => setEditing(true)}>
            <Edit /> Editar
          </button>
        )}
      </div>
      <div className="farm-card">
        <div className="farm-hero">
          <div className="farm-avatar">
            <Agriculture />
          </div>
          <div>
            <h2>{profile.farm}</h2>
            <p>{profile.producer}</p>
          </div>
        </div>
        {editing ? (
          <form className="form-grid" onSubmit={submit}>
            {profileFields.map(([name, label]) => (
              <label key={name}>
                {label}
                <input
                  name={name}
                  value={profile[name]}
                  onChange={update}
                  required
                />
              </label>
            ))}
            <button className="primary-button form-submit" type="submit">
              Guardar cambios
            </button>
          </form>
        ) : (
          <div className="profile-details">
            {Object.entries({
              Provincia: profile.province,
              Cantón: profile.canton,
              Cultivos: profile.crops,
              Área: profile.area
            }).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="info-callout">
        <CheckCircle />{' '}
        <span>
          <strong>Tu información está protegida.</strong>
          <br />
          AgroCuenta funciona sin internet. Si borras los datos del navegador,
          esta información se perderá.
        </span>
      </div>
      <div className="farm-card farm-crops-link">
        <div><p className="eyebrow">Producción organizada</p><h2>Mis cultivos</h2><p className="muted">Tienes {data.crops.length} cultivos registrados y puedes relacionar tus movimientos con ellos.</p></div>
        <button className="outline-button" onClick={() => onNavigate('crops')}>Administrar cultivos</button>
      </div>
    </section>
  )
}
