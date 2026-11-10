import { ArrowDownward, ArrowUpward, Delete, Edit } from '@mui/icons-material'
import { formatDate, money } from '../../utils/formatters'

export function MovementList({ movements, onEdit, onDelete }) {
  return (
    <div className="movement-list">
      {movements.map(movement => (
        <div className="movement-row" key={movement.id}>
          <div className={`movement-symbol ${movement.type}`}>
            {movement.type === 'income' ? <ArrowUpward /> : <ArrowDownward />}
          </div>
          <div className="movement-info">
            <strong>{movement.description}</strong>
            <span>
              {movement.category} · {formatDate(movement.date)}
              {movement.crop ? ` · ${movement.crop}` : ''}
            </span>
            {(movement.paymentMethod || movement.buyer) && (
              <small className="movement-detail">
                {movement.paymentMethod ? `Pago: ${movement.paymentMethod}` : ''}
                {movement.buyer ? ` · ${movement.buyer}` : ''}
              </small>
            )}
          </div>
          <strong
            className={movement.type === 'income' ? 'positive' : 'negative'}
          >
            {movement.type === 'income' ? '+' : '-'}
            {money(movement.amount)}
          </strong>
          {(onEdit || onDelete) && (
            <div className="movement-actions">
              {onEdit && (
                <button
                  className="icon-button"
                  onClick={() => onEdit(movement)}
                  aria-label={`Editar ${movement.description}`}
                >
                  <Edit />
                </button>
              )}
              {onDelete && (
                <button
                  className="icon-button danger-icon"
                  onClick={() => onDelete(movement)}
                  aria-label={`Eliminar ${movement.description}`}
                >
                  <Delete />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
