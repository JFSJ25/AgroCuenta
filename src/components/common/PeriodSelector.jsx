const periods = [['week', 'Esta semana'], ['month', 'Este mes'], ['year', 'Este año']]

export function PeriodSelector({ value, onChange }) {
  return <div className="period-tabs">{periods.map(([period, label]) => <button key={period} className={value === period ? 'selected' : ''} onClick={() => onChange(period)}>{label}</button>)}</div>
}
