import { money } from '../../utils/formatters'

export function SimpleChart({ income, expense }) {
  const max = Math.max(income, expense, 1)
  return (
    <div className="simple-chart">
      <div className="chart-total">
        <strong>{money(income - expense)}</strong>
        <span>resultado del mes</span>
      </div>
      <div className="bars">
        <div className="bar-group">
          <div
            className="bar income-bar"
            style={{ height: `${Math.max(30, (income / max) * 150)}px` }}
          >
            <span>{money(income)}</span>
          </div>
          <small>Ventas</small>
        </div>
        <div className="bar-group">
          <div
            className="bar expense-bar"
            style={{ height: `${Math.max(30, (expense / max) * 150)}px` }}
          >
            <span>{money(expense)}</span>
          </div>
          <small>Gastos</small>
        </div>
      </div>
    </div>
  )
}
