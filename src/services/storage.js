import { initialData } from '../db/initialData'
import { agroDb } from '../db/database'

const STORAGE_KEY = 'agrocuenta-data'

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const data = saved ? JSON.parse(saved) : initialData
    return normalizeData(data)
  } catch {
    return normalizeData(initialData)
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
    ...initialData,
    ...data,
    profile: { ...initialData.profile, ...data.profile },
    crops: data.crops || [],
    movements: data.movements || [],
    inventory: data.inventory || [],
    production: data.production || [],
    inventoryHistory: data.inventoryHistory || []
  }
}

export async function saveInventoryEvent(event) {
  await agroDb.inventoryHistory.put(event)
}

export async function clearStoredData() {
  localStorage.removeItem(STORAGE_KEY)
  await Promise.all([
    agroDb.appState.clear(),
    agroDb.inventoryHistory.clear()
  ])
}
