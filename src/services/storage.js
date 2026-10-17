import { demoData } from '../db/demoData'
import { agroDb } from '../db/database'

const STORAGE_KEY = 'agrocuenta-data'

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const data = saved ? JSON.parse(saved) : demoData
    return normalizeData(data)
  } catch {
    return demoData
  }
}

export function persistData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  return agroDb.appState.put({ id: 'current', data })
}

export async function hydrateData() {
  try {
    const saved = await agroDb.appState.get('current')
    if (saved?.data) return normalizeData(saved.data)
    const data = loadData()
    await persistData(data)
    return data
  } catch (error) {
    console.error('No se pudo abrir el almacenamiento local IndexedDB.', error)
    return loadData()
  }
}

export function normalizeData(data) {
  return {
    ...demoData,
    ...data,
    profile: { ...demoData.profile, ...data.profile },
    crops: data.crops || demoData.crops,
    movements: (data.movements || demoData.movements).map(movement => {
      const demoMovement = demoData.movements.find(item => item.id === movement.id)
      return demoMovement ? { ...demoMovement, ...movement, crop: movement.crop || demoMovement.crop } : movement
    }),
    inventory: data.inventory || demoData.inventory,
    production: data.production || [],
    inventoryHistory: data.inventoryHistory || []
  }
}

export async function saveInventoryEvent(event) {
  await agroDb.inventoryHistory.put(event)
}
