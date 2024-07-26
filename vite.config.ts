import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      manifest: {
        name: 'Calendar App',
        short_name: 'CalendarApp',
        description: 'You can add many events to create a reminders',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

  ],

})


