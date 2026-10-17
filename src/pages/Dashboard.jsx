import {
  Agriculture,
  ArrowDownward,
  ArrowUpward,
  CalendarToday,
  ReceiptLong,
  Savings,
  ShoppingCart
} from '@mui/icons-material'
import { Metric } from '../components/dashboard/Metric'
import { SimpleChart } from '../components/dashboard/SimpleChart'
import { MovementList } from '../components/common/MovementList'
import { money } from '../utils/formatters'

export function Dashboard({ totals, data, onRegister, onNavigate }) {
  const profit = totals.income - totals.expense
  return (
    <section>
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Buenos días, Carlos</p>
          <h1>Así va tu finca este mes</h1>
        </div>
        <div className="date-pill">
          <CalendarToday fontSize="small" /> Octubre 2026
        </div>
      </div>
      <div className="metrics-grid">
        <Metric
          icon={<ShoppingCart />}
          label="Ventas"
          value={money(totals.income)}
          tone="green"
        />
        <Metric
          icon={<ReceiptLong />}
          label="Gastos"
          value={money(totals.expense)}
          tone="red"
        />
        <Metric
          icon={<Savings />}
          label="Ganancia"
          value={money(profit)}
          tone="yellow"
        />
        <Metric
          icon={<Agriculture />}
          label="Producción"
          value="520 kg"
          tone="blue"
        />
      </div>
      <div className="quick-actions">
        <button
          className="action-button expense"
          onClick={() => onRegister('expense')}
        >
          <ArrowDownward /> Registrar gasto
        </button>
        <button
          className="action-button income"
          onClick={() => onRegister('sale')}
        >
          <ArrowUpward /> Registrar venta
        </button>
      </div>
      <div className="content-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Resumen de este mes</p>
              <h2>Ventas y gastos</h2>
            </div>
            <span className="legend">
              <i className="dot green" /> Ventas <i className="dot red" />{' '}
              Gastos
            </span>
          </div>
          <SimpleChart income={totals.income} expense={totals.expense} />
        </div>
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Tu actividad</p>
              <h2>Últimos movimientos</h2>
            </div>
            <button
              className="text-button"
              onClick={() => onNavigate('movements')}
            >
              Ver todos
            </button>
          </div>
          <MovementList movements={data.movements.slice(0, 4)} />
        </div>
      </div>
      <div className="production-link panel">
        <div>
          <p className="eyebrow">También puedes revisar</p>
          <h2>Producción y costos por cultivo</h2>
          <p className="muted">
            Calcula tu costo por unidad y revisa la ganancia de cada cultivo.
          </p>
        </div>
        <button
          className="outline-button"
          onClick={() => onNavigate('production')}
        >
          Ver producción
        </button>
      </div>
    </section>
  )
}
