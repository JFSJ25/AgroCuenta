# AgroCuenta

Aplicación web offline para registrar ventas, gastos, producción, cultivos e inventario de una finca.

## Acceso

La aplicación publicada está disponible en:

<https://jfsj25.github.io/AgroCuenta/>

Funciona directamente en el navegador y no requiere conexión permanente a internet después de la primera carga.

### Instalar como aplicación

1. Abre la URL publicada en Chrome o Edge.
2. Espera a que termine la primera carga con conexión a internet.
3. Usa el icono de instalación de la barra de direcciones o el menú del navegador:
   - Chrome: **Instalar AgroCuenta**.
   - Edge: **Aplicaciones → Instalar AgroCuenta**.
4. Abre AgroCuenta desde el escritorio o el menú de aplicaciones.

Una vez instalada, la interfaz y los recursos quedan disponibles offline. Los datos se guardan localmente en el dispositivo mediante IndexedDB.

## Manual de usuario

### Primera apertura

La aplicación inicia sin datos. Completa primero la información de la finca desde **Mi finca** y luego registra tus cultivos, insumos y movimientos.

### Registrar información

- Usa **Registrar gasto** para guardar un gasto.
- Usa **Registrar venta** para registrar una venta, comprador, cultivo y método de pago.
- Usa **Registrar producción** desde **Mi producción** para guardar una cosecha.
- En **Inventario**, agrega insumos y registra entradas o salidas.
- En **Mi finca**, administra los cultivos registrados.

Los cambios se guardan automáticamente en el navegador.

### Reportes

En **Mi producción** selecciona el periodo semanal, mensual o anual y usa **Descargar reporte** para generar un PDF.

### Respaldos

Abre **Más opciones** y usa:

- **Exportar respaldo** para descargar un archivo JSON.
- **Importar respaldo** para restaurar un archivo JSON válido.

Se recomienda exportar respaldos periódicamente y conservarlos fuera del navegador. Los datos no se sincronizan entre dispositivos ni navegadores.

### Uso offline y almacenamiento

AgroCuenta guarda la información localmente mediante IndexedDB. No utiliza un servidor, cuentas de usuario ni una base de datos central.

Por este motivo:

- Los datos pertenecen al navegador y dispositivo donde se registran.
- Borrar los datos del navegador puede eliminar la información local.
- Cambiar de equipo requiere importar un respaldo.
- No se necesita configurar CORS ni una conexión a una API.

Se recomienda usar las versiones recientes de Chrome, Edge, Firefox o Safari y acceder mediante la URL publicada, no abriendo archivos directamente con `file://`.

## Desarrollo

Requisitos: Node.js y pnpm.

```bash
pnpm install
pnpm run dev
```

Validar el proyecto:

```bash
pnpm run lint
pnpm run build
```

El workflow de GitHub Actions ejecuta lint, build y despliegue a GitHub Pages automáticamente en cada push a `main`.