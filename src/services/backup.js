import { normalizeData } from './storage'

export function exportBackup(data) {
  const payload = {
    app: 'AgroCuenta',
    version: 1,
    exportedAt: new Date().toISOString(),
    data
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `respaldo-agrocuenta-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export function importBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result)
        if (payload?.app !== 'AgroCuenta' || !payload.data) throw new Error('El archivo no corresponde a un respaldo de AgroCuenta.')
        resolve(normalizeData(payload.data))
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('No se pudo leer el archivo de respaldo.'))
    reader.readAsText(file)
  })
}
