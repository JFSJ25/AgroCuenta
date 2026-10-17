import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { money } from '../utils/formatters'

export function getReportData(data, period = 'month', reference = new Date()) {
  const end = new Date(reference)
  end.setHours(23, 59, 59, 999)
  const start = new Date(reference)
  if (period === 'week') start.setDate(start.getDate() - 6)
  if (period === 'month') start.setDate(1)
  if (period === 'year') {
    start.setMonth(0)
    start.setDate(1)
  }
  start.setHours(0, 0, 0, 0)
  const movements = data.movements.filter(item => {
    const date = new Date(`${item.date}T12:00:00`)
    return date >= start && date <= end
  })
  const production = data.production.filter(item => {
    const date = new Date(`${item.date}T12:00:00`)
    return date >= start && date <= end
  })
  const totals = movements.reduce((result, movement) => {
    result[movement.type] += movement.amount
    return result
  }, { income: 0, expense: 0 })
  return { ...data, movements, production, totals }
}

export function downloadReport({ data, totals, period = 'month' }) {
  const document = new jsPDF()
  const profit = totals.income - totals.expense
  document.setFontSize(22)
  document.setTextColor(47, 125, 50)
  document.text('AgroCuenta', 20, 22)
  document.setFontSize(11)
  document.setTextColor(70, 80, 70)
  document.text(`Reporte de tu finca - ${periodLabels[period]}`, 20, 31)
  document.text(`Finca: ${data.profile.farm}`, 20, 43)
  document.text(`Productor: ${data.profile.producer}`, 20, 50)
  autoTable(document, {
    startY: 62,
    head: [['Resumen', 'Valor']],
    body: [
      ['Ventas', money(totals.income)],
      ['Gastos', money(totals.expense)],
      ['Ganancia', money(profit)]
    ],
    headStyles: { fillColor: [47, 125, 50] }
  })
  autoTable(document, {
    startY: document.lastAutoTable.finalY + 12,
    head: [['Cultivo', 'Producción', 'Gastos relacionados', 'Ganancia']],
    body: summarizeCrops(data).map(crop => [
      crop.name,
      `${crop.production} ${crop.unit}`,
      money(crop.expenses),
      money(crop.income - crop.expenses)
    ]),
    headStyles: { fillColor: [47, 125, 50] }
  })
  document.setFontSize(9)
  document.text(
    `Generado localmente el ${new Date().toLocaleDateString('es-EC')}`,
    20,
    285
  )
  document.save(
    `reporte-agrocuenta-${new Date().toISOString().slice(0, 10)}.pdf`
  )
}

const periodLabels = { week: 'Esta semana', month: 'Este mes', year: 'Este año' }

export function summarizeCrops(data) {
  const names = [
    ...new Set([
      ...data.production.map(item => item.crop),
      ...data.movements.map(item => item.crop).filter(Boolean)
    ])
  ]
  return names.map(name => {
    const production = data.production.filter(item => item.crop === name)
    const related = data.movements.filter(item => item.crop === name)
    const expenses = related
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
    const income = related
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)
    return {
      name,
      production: production.reduce((sum, item) => sum + item.quantity, 0),
      unit: production[0]?.unit || 'kg',
      expenses,
      income
    }
  })
}
