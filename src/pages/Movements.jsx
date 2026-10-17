import { CalendarToday } from '@mui/icons-material'
import { useState } from 'react'
import { MovementList } from '../components/common/MovementList'
import { TODAY } from '../utils/formatters'

export function Movements({ data, filter, setFilter }) {
  const [period, setPeriod] = useState('month')
  const [showPeriods, setShowPeriods] = useState(false)
  const now = new Date(`${TODAY}T12:00:00`)
  const start = new Date(now)
  if (period === 'today') start.setHours(0, 0, 0, 0)
  if (period === 'week') start.setDate(now.getDate() - 7)
  if (period === 'month') start.setDate(1)
  const movements = data.movements.filter(item => {
    const matchesType =
      filter === 'all' ||
      (filter === 'income' && item.type === 'income') ||
      (filter === 'expense' && item.type === 'expense')
    return (
      matchesType &&
      (period === 'all' || new Date(`${item.date}T23:59:59`) >= start)
    )
  })
  const periodLabels = {
    all: 'Todo el tiempo',
    today: 'Hoy',
    week: 'Esta semana',
    month: 'Este mes'
  }
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Tu historial</p>
          <h1>Movimientos</h1>
          <p className="muted">Todo lo que entra y sale de tu finca.</p>
        </div>
        <div className="period-picker">
          <button
            className="outline-button"
            onClick={() => setShowPeriods(!showPeriods)}
          >
            <CalendarToday /> {periodLabels[period]}
          </button>
          {showPeriods && (
            <div className="period-menu">
              {Object.entries(periodLabels).map(([value, label]) => (
                <button
                  key={value}
                  className={period === value ? 'selected' : ''}
                  onClick={() => {
                    setPeriod(value)
                    setShowPeriods(false)
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="filter-tabs">
        {[
          ['all', 'Todos'],
          ['income', 'Ingresos'],
          ['expense', 'Gastos']
        ].map(([value, label]) => (
          <button
            key={value}
            className={filter === value ? 'selected' : ''}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="panel movements-panel">
        <MovementList movements={movements} />
      </div>
    </section>
  )
}
