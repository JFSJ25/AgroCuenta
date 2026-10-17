# AgroCuenta: instrucciones para Copilot

App web para pequeños agricultores (Ecuador) que controla gastos, ventas,
producción, inventario y ganancia. Especificación completa: `docs/AgroCuenta.md`.

## Stack
- Vite + React, **JavaScript (NO TypeScript)**. Gestor de paquetes: **pnpm**.
- Rutas: `react-router-dom` con **HashRouter**. Vite con `base: './'`.
- Datos: **Dexie (IndexedDB)** + `dexie-react-hooks` (`useLiveQuery`).
  localStorage solo para preferencias.
- UI: MUI + `@mui/icons-material` (iconos Material, **nunca emojis**).
- Gráficos: `recharts` (solo barras simples Ventas vs Gastos).
- PDF: `jspdf` + `jspdf-autotable`, generado en el navegador.
- Fechas: `date-fns`. Fuente: `@fontsource/nunito` (local).

## Reglas críticas
- La app funciona **100% offline y solo con almacenamiento local**.
  Nunca agregar fetch/axios, Supabase, Firebase, login, CDNs ni servicios remotos.
- Ninguna página accede a Dexie directamente: todo pasa por `src/services/`.
- Cálculos en `src/utils/calculos.js`:
  - ganancia = ingresos - gastos
  - costo por unidad = costo de producción / cantidad producida
  - precio promedio = total vendido / cantidad vendida
- No dar recomendaciones agronómicas (dosis, plaguicidas, fertilizantes).

## Estructura
src/{components,pages,db,services,hooks,utils,theme}

## UX y lenguaje
- Público: agricultores de 30 a 65 años, poca experiencia tecnológica.
- Botones grandes, texto grande, alto contraste, máximo 4 o 5 campos por formulario.
- Lenguaje cotidiano, todo en español: "Registrar gasto" (no "egreso"),
  "Dinero que entra y sale" (no "flujo de caja"), "Ganancia" (no "margen").
- No depender solo del color (agregar icono o texto). Usar aria-labels.
- Mensajes de error simples, sin términos técnicos: "Ingresa el valor del gasto."
- Confirmación visual al guardar y actualizar el dashboard al instante.
- Evitar tablas grandes y dashboards con muchos gráficos. Mobile first.

## Paleta
Verde agrícola (principal), amarillo (secundario), fondo crema/blanco,
verde claro = positivo, rojo suave = gasto/pérdida, amarillo suave = alerta,
gris oscuro = texto.

## Formato
- Moneda: USD, locale `es-EC`. Prohibidos valores negativos en formularios.
- Código: componentes funcionales, hooks, nombres de dominio en español
  (gastos, ventas, insumos, cultivos).