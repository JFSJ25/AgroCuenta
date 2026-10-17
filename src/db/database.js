import Dexie from 'dexie'

export const agroDb = new Dexie('agrocuenta')
agroDb.version(1).stores({
  appState: 'id',
  inventoryHistory: 'id,itemId,date'
})
