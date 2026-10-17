import { Add, Agriculture, Download, TrendingUp } from '@mui/icons-material'
import { useState } from 'react'
import { getReportData, summarizeCrops } from '../services/report'
import { PeriodSelector } from '../components/common/PeriodSelector'
import { formatDate, money } from '../utils/formatters'

export function Production({ data, onAdd, onDownloadReport }) {
  const [period, setPeriod] = useState('month')
  const reportData = getReportData(data, period)
  const periodTotals = reportData.totals
  const crops = summarizeCrops(reportData)
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Producción y resultados</p>
          <h1>Mi producción</h1>
          <p className="muted">
            Conoce cuánto te cuesta producir y cuánto ganas.
          </p>
        </div>
        <div className="heading-actions">
          <button className="outline-button" onClick={() => onDownloadReport(period)}>
            <Download /> Descargar reporte
          </button>
          <button className="primary-button" onClick={onAdd}>
            <Add /> Registrar producción
          </button>
        </div>
      </div>
      <PeriodSelector value={period} onChange={setPeriod} />
      <div className="production-summary">
        <div>
          <span>Ingresos</span>
          <strong className="positive">{money(periodTotals.income)}</strong>
        </div>
        <div>
          <span>Gastos</span>
          <strong className="negative">{money(periodTotals.expense)}</strong>
        </div>
        <div>
          <span>Resultado</span>
          <strong className="positive">
            {money(periodTotals.income - periodTotals.expense)}
          </strong>
        </div>
      </div>
      <div className="production-grid">
        {crops.map(crop => (
          <div className="crop-card" key={crop.name}>
            <div className="crop-card-heading">
              <div className="inventory-icon">
                <Agriculture />
              </div>
              <div>
                <p className="eyebrow">{crop.name}</p>
                <h2>Resumen del cultivo</h2>
              </div>
            </div>
            <div className="crop-stats">
              <div>
                <span>Gastos</span>
                <strong>{money(crop.expenses)}</strong>
              </div>
              <div>
                <span>Producción</span>
                <strong>
                  {crop.production} {crop.unit}
                </strong>
              </div>
              <div>
                <span>Costo por unidad</span>
                <strong>
                  {money(crop.production ? crop.expenses / crop.production : 0)}
                </strong>
              </div>
              <div>
                <span>Ganancia</span>
                <strong
                  className={
                    crop.income - crop.expenses >= 0 ? 'positive' : 'negative'
                  }
                >
                  {money(crop.income - crop.expenses)}
                </strong>
              </div>
            </div>
            <div className="crop-bar">
              <i
                style={{
                  width: `${crop.income ? Math.min(100, (crop.expenses / crop.income) * 100) : 0}%`
                }}
              />
              <span>
                <TrendingUp />{' '}
                {crop.income
                  ? `${Math.round((crop.expenses / crop.income) * 100)}% de los ingresos cubren costos`
                  : 'Aún no hay ventas asociadas'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="panel production-history">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Cosechas registradas</p>
            <h2>Historial de producción</h2>
          </div>
        </div>
        {data.production.map(item => (
          <div className="production-row" key={item.id}>
            <div className="movement-symbol income">
              <Agriculture />
            </div>
            <div className="movement-info">
              <strong>{item.crop}</strong>
              <span>
                {item.quantity} {item.unit}
                {item.lot ? ` · Lote ${item.lot}` : ''}
              </span>
            </div>
            <span className="muted">{formatDate(item.date)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
