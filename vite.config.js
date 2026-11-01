import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'apple-touch-icon.png',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png'
      ],
      manifest: {
        name: 'AgroCuenta',
        short_name: 'AgroCuenta',
        description: 'Control local de ventas, gastos, producción e inventario agrícola.',
        start_url: './',
        scope: './',
        display: 'standalone',
        theme_color: '#2f7d32',
        background_color: '#f8fbf5',
        lang: 'es',
        icons: [
          {
            src: './web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}']
      }
    })
  ],
  base: './',
})
