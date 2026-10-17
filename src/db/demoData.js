export const demoData = {
  profile: {
    farm: 'La Esperanza',
    producer: 'Carlos Mendoza',
    province: 'El Oro',
    canton: 'Machala',
    crops: 'Cacao y plátano',
    area: '5 hectáreas'
  },
  crops: [
    { id: 1, name: 'Cacao', area: 3, areaUnit: 'hectáreas', plantingDate: '2024-04-15', expectedProduction: 600, actualProduction: 500 },
    { id: 2, name: 'Plátano', area: 2, areaUnit: 'hectáreas', plantingDate: '2024-06-10', expectedProduction: 120, actualProduction: 100 }
  ],
  movements: [
    {
      id: 1,
      type: 'income',
      category: 'Venta',
      description: 'Venta de cacao',
      amount: 640,
      date: '2026-10-08',
      crop: 'Cacao',
      paymentMethod: 'Efectivo',
      buyer: 'Mercado local',
      detail: '200 kg · $3.20/kg'
    },
    {
      id: 2,
      type: 'income',
      category: 'Venta',
      description: 'Venta de plátano',
      amount: 700,
      date: '2026-10-06',
      crop: 'Plátano',
      paymentMethod: 'Transferencia',
      buyer: 'Comercializadora El Oro',
      detail: '100 cajas · $7/caja'
    },
    {
      id: 3,
      type: 'expense',
      category: 'Fertilizantes',
      description: 'Fertilizante NPK',
      amount: 120,
      date: '2026-10-07',
      crop: 'Cacao',
      detail: 'Cacao'
    },
    {
      id: 4,
      type: 'expense',
      category: 'Mano de obra',
      description: 'Pago de jornal',
      amount: 250,
      date: '2026-10-05',
      crop: 'Cacao',
      detail: 'Cacao'
    },
    {
      id: 5,
      type: 'expense',
      category: 'Transporte',
      description: 'Transporte de cosecha',
      amount: 80,
      date: '2026-10-03',
      crop: 'Plátano',
      detail: 'Plátano'
    },
    {
      id: 6,
      type: 'expense',
      category: 'Riego',
      description: 'Mantenimiento de riego',
      amount: 50,
      date: '2026-10-01',
      crop: 'Cacao',
      detail: 'Cacao'
    }
  ],
  inventory: [
    {
      id: 1,
      name: 'Fertilizante NPK',
      quantity: 4,
      unit: 'sacos',
      minimum: 2,
      cost: 120
    },
    {
      id: 2,
      name: 'Herbicida',
      quantity: 8,
      unit: 'litros',
      minimum: 3,
      cost: 65
    },
    {
      id: 3,
      name: 'Semillas de maíz',
      quantity: 15,
      unit: 'kg',
      minimum: 5,
      cost: 45
    }
  ],
  inventoryHistory: [
    { id: 1, itemId: 1, itemName: 'Fertilizante NPK', type: 'entry', quantity: 4, balance: 4, date: '2026-10-01' },
    { id: 2, itemId: 2, itemName: 'Herbicida', type: 'entry', quantity: 8, balance: 8, date: '2026-10-01' },
    { id: 3, itemId: 3, itemName: 'Semillas de maíz', type: 'entry', quantity: 15, balance: 15, date: '2026-10-01' }
  ],
  production: [
    {
      id: 1,
      crop: 'Cacao',
      quantity: 500,
      unit: 'kg',
      date: '2026-10-08',
      lot: 'C-001'
    },
    {
      id: 2,
      crop: 'Plátano',
      quantity: 100,
      unit: 'cajas',
      date: '2026-10-06',
      lot: 'P-001'
    }
  ]
}
