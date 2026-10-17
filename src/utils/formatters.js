export const TODAY = (() => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
})()

export function money(value) {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value)
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('es-EC', {
    day: 'numeric',
    month: 'short'
  }).format(new Date(`${value}T12:00:00`))
}
