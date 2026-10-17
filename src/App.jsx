import { useEffect, useMemo, useState } from 'react'
import { CheckCircle } from '@mui/icons-material'
import { demoData } from './db/demoData'
import { BottomNav } from './components/layout/BottomNav'
import { TopBar } from './components/layout/TopBar'
import { ExpenseForm } from './components/forms/ExpenseForm'
import { InventoryForm } from './components/forms/InventoryForm'
import { RegisterChooser } from './components/forms/RegisterChooser'
import { SaleForm } from './components/forms/SaleForm'
import { ProductionForm } from './components/forms/ProductionForm'
import { OptionsMenu } from './components/forms/OptionsMenu'
import { StockAdjustmentForm } from './components/forms/StockAdjustmentForm'
import { CropForm } from './components/forms/CropForm'
import { Dashboard } from './pages/Dashboard'
import { Farm } from './pages/Farm'
import { Inventory } from './pages/Inventory'
import { Movements } from './pages/Movements'
import { Production } from './pages/Production'
import { Crops } from './pages/Crops'
import { hydrateData, loadData, persistData, saveInventoryEvent } from './services/storage'
import { downloadReport, getReportData } from './services/report'
import { exportBackup, importBackup } from './services/backup'
import './App.css'

function App() {
  const [data, setData] = useState(loadData)
  const [section, setSection] = useState('home')
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const [movementFilter, setMovementFilter] = useState('all')
  useEffect(() => {
    hydrateData().then(setData)
  }, [])

  const totals = useMemo(
    () =>
      data.movements.reduce(
        (result, movement) => {
          result[movement.type] += movement.amount
          return result
        },
        { income: 0, expense: 0 }
      ),
    [data.movements]
  )

  const saveData = nextData => {
    setData(nextData)
    persistData(nextData)
  }

  const handleImport = async file => {
    if (!file) return
    try {
      const imported = await importBackup(file)
      if (!window.confirm('Esto reemplazará los datos actuales por el respaldo seleccionado. ¿Deseas continuar?')) return
      saveData(imported)
      setModal(null)
      showNotice('Respaldo importado correctamente')
    } catch (error) {
      showNotice(error.message)
    }
  }

  const showNotice = message => {
    setNotice(message)
    setTimeout(() => setNotice(''), 3500)
  }

  const addMovement = movement => {
    saveData({
      ...data,
      movements: [{ ...movement, id: Date.now() }, ...data.movements]
    })
    setModal(null)
    showNotice(
      `${movement.type === 'income' ? 'Venta' : 'Gasto'} guardado correctamente`
    )
  }

  const addCrop = crop => {
    saveData({ ...data, crops: [...data.crops, { ...crop, id: Date.now() }] })
    setModal(null)
    showNotice('Cultivo guardado correctamente')
  }

  const updateCrop = crop => {
    saveData({ ...data, crops: data.crops.map(current => current.id === crop.id ? crop : current) })
    setModal(null)
    showNotice('Cultivo actualizado correctamente')
  }

  const deleteCrop = crop => {
    if (!window.confirm(`¿Eliminar el cultivo ${crop.name}? Sus movimientos se conservarán, pero dejarán de aparecer como cultivo registrado.`)) return
    saveData({ ...data, crops: data.crops.filter(current => current.id !== crop.id) })
    showNotice('Cultivo eliminado')
  }

  const addInventory = item => {
    saveData({
      ...data,
      inventory: [...data.inventory, { ...item, id: Date.now() }]
    })
    setModal(null)
    showNotice('Insumo agregado correctamente')
  }

  const updateInventory = item => {
    saveData({
      ...data,
      inventory: data.inventory.map(current =>
        current.id === item.id ? item : current
      )
    })
    setModal(null)
    showNotice('Insumo actualizado correctamente')
  }

  const adjustStock = (item, direction, quantity) => {
    const nextQuantity =
      direction === 'entry'
        ? item.quantity + quantity
        : item.quantity - quantity
    if (nextQuantity < 0) {
      showNotice('La salida no puede superar el stock disponible')
      return
    }
    const event = {
      id: Date.now(),
      itemId: item.id,
      itemName: item.name,
      type: direction,
      quantity,
      balance: nextQuantity,
      date: new Date().toISOString().slice(0, 10)
    }
    const nextData = {
      ...data,
      inventory: data.inventory.map(current => current.id === item.id ? { ...current, quantity: nextQuantity } : current),
      inventoryHistory: [...(data.inventoryHistory || []), event]
    }
    saveData(nextData)
    saveInventoryEvent(event)
    setModal(null)
    showNotice(direction === 'entry' ? 'Entrada registrada' : 'Salida registrada')
  }

  const resetDemoData = () => {
    if (
      !window.confirm(
        'Esto reemplazará tus datos actuales por los datos de demostración. ¿Deseas continuar?'
      )
    )
      return
    const nextData = structuredClone(demoData)
    saveData(nextData)
    setModal(null)
    showNotice('Datos demo restaurados')
  }

  const addProduction = production => {
    saveData({
      ...data,
      production: [
        { ...production, id: Date.now() },
        ...(data.production || [])
      ]
    })
    setModal(null)
    showNotice('Producción guardada correctamente')
  }

  return (
    <div className="app-shell">
      <TopBar onMenu={() => setModal('options')} />
      <main className="main-content">
        {section === 'home' && (
          <Dashboard
            totals={totals}
            data={data}
            onRegister={setModal}
            onNavigate={setSection}
          />
        )}
        {section === 'movements' && (
          <Movements
            data={data}
            filter={movementFilter}
            setFilter={setMovementFilter}
          />
        )}
        {section === 'inventory' && (
          <Inventory
            data={data}
            onAdd={() => setModal('inventory')}
            onEdit={item => setModal({ type: 'inventory-edit', item })}
            onAdjust={(item, direction) =>
              setModal({ type: 'stock', item, direction })
            }
          />
        )}
        {section === 'production' && (
          <Production
            data={data}
            totals={totals}
            onAdd={() => setModal('production')}
            onDownloadReport={period => {
              const reportData = getReportData(data, period)
              downloadReport({ data: reportData, totals: reportData.totals, period })
            }}
          />
        )}
        {section === 'crops' && (
          <Crops
            data={data}
            onAdd={() => setModal('crop')}
            onEdit={crop => setModal({ type: 'crop-edit', crop })}
            onDelete={deleteCrop}
          />
        )}
        {section === 'farm' && <Farm data={data} saveData={saveData} onNavigate={setSection} />}
      </main>
      {notice && (
        <div className="toast">
          <CheckCircle /> {notice}
        </div>
      )}
      <BottomNav
        section={section}
        onNavigate={setSection}
        onRegister={setModal}
      />
      {modal === 'chooser' && (
        <RegisterChooser onClose={() => setModal(null)} onSelect={setModal} />
      )}
      {modal === 'expense' && (
        <ExpenseForm crops={data.crops} onClose={() => setModal(null)} onSave={addMovement} />
      )}
      {modal === 'sale' && (
        <SaleForm crops={data.crops} onClose={() => setModal(null)} onSave={addMovement} />
      )}
      {modal === 'inventory' && (
        <InventoryForm onClose={() => setModal(null)} onSave={addInventory} />
      )}
      {modal?.type === 'inventory-edit' && (
        <InventoryForm
          initialItem={modal.item}
          onClose={() => setModal(null)}
          onSave={updateInventory}
        />
      )}
      {modal?.type === 'stock' && (
        <StockAdjustmentForm
          item={modal.item}
          direction={modal.direction}
          onClose={() => setModal(null)}
          onSave={quantity =>
            adjustStock(modal.item, modal.direction, quantity)
          }
        />
      )}
      {modal === 'production' && (
        <ProductionForm crops={data.crops} onClose={() => setModal(null)} onSave={addProduction} />
      )}
      {modal === 'crop' && <CropForm onClose={() => setModal(null)} onSave={addCrop} />}
      {modal?.type === 'crop-edit' && <CropForm initialCrop={modal.crop} onClose={() => setModal(null)} onSave={updateCrop} />}
      {modal === 'options' && (
        <OptionsMenu
          onClose={() => setModal(null)}
          onNavigate={setSection}
          onReset={resetDemoData}
          onExport={() => { exportBackup(data); setModal(null) }}
          onImport={handleImport}
        />
      )}
    </div>
  )
}

export default App
