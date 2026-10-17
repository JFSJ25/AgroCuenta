import { Add, BarChart, Inventory2, ListAlt, Person } from '@mui/icons-material'

const navItems = [
  { id: 'home', label: 'Inicio', icon: <BarChart /> },
  { id: 'movements', label: 'Movimientos', icon: <ListAlt /> },
  { id: 'register', label: 'Registrar', icon: <Add />, primary: true },
  { id: 'inventory', label: 'Inventario', icon: <Inventory2 /> },
  { id: 'farm', label: 'Mi finca', icon: <Person /> }
]

export function BottomNav({ section, onNavigate, onRegister }) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`${item.primary ? 'register-nav' : ''} ${section === item.id ? 'active' : ''}`}
          onClick={() =>
            item.primary ? onRegister('chooser') : onNavigate(item.id)
          }
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
