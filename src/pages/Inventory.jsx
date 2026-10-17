import { Add, ArrowDownward, Edit, History, Inventory2 } from '@mui/icons-material'
import { formatDate, money } from '../utils/formatters'

export function Inventory({ data, onAdd, onEdit, onAdjust }) {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Control sencillo</p>
          <h1>Inventario</h1>
          <p className="muted">Revisa tus insumos antes de que se terminen.</p>
        </div>
        <button className="primary-button" onClick={onAdd}>
          <Add /> Agregar insumo
        </button>
      </div>
      <div className="inventory-grid">
        {data.inventory.map(item => (
          <div className="inventory-card" key={item.id}>
            <div className="inventory-title">
              <div className="inventory-icon">
                <Inventory2 />
              </div>
              <div className="panel inventory-history-panel">
                <div className="panel-heading"><div><p className="eyebrow">Trazabilidad</p><h2>Historial de inventario</h2></div><History className="panel-heading-icon" /></div>
                {(data.inventoryHistory || []).slice().reverse().slice(0, 10).map(event => <div className="production-row" key={event.id}><div className={`movement-symbol ${event.type === 'entry' ? 'income' : 'expense'}`}>{event.type === 'entry' ? <Add /> : <ArrowDownward />}</div><div className="movement-info"><strong>{event.itemName}</strong><span>{event.type === 'entry' ? 'Entrada' : 'Salida'} · {event.quantity} unidades · saldo {event.balance}</span></div><span className="muted">{formatDate(event.date)}</span></div>)}
                {!data.inventoryHistory?.length && <p className="muted">Todavía no hay movimientos de inventario.</p>}
              </div>
              <div>
                <strong>{item.name}</strong>
                <span>{money(item.cost)} aprox.</span>
              </div>
              <button
                className="icon-button"
                aria-label={`Editar ${item.name}`}
                onClick={() => onEdit(item)}
              >
                <Edit fontSize="small" />
              </button>
            </div>
            <div className="stock-row">
              <strong>{item.quantity}</strong>
              <span>{item.unit}</span>
            </div>
            <div className="stock-bar">
              <i
                style={{
                  width: `${Math.min(100, (item.quantity / Math.max(item.minimum * 3, 1)) * 100)}%`
                }}
              />
            </div>
            {item.quantity <= item.minimum && (
              <div className="low-stock">
                Quedan solo {item.quantity} {item.unit}
              </div>
            )}
            <div className="inventory-actions">
              <button onClick={() => onAdjust(item, 'entry')}>
                <Add /> Entrada
              </button>
              <button onClick={() => onAdjust(item, 'exit')}>
                <ArrowDownward /> Salida
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
