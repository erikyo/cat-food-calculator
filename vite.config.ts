import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg}']
            },
            includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
            manifest: {
                "short_name": "Cat Food calc",
                "name": "Cat Food Calculator",
                "icons": [
                    {
                        "src": "./paw-64.png",
                        "sizes": "64x64",
                        "type": "image/png"
                    },
                    {
                        "src": "./paw-192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "./paw-512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
                "start_url": ".",
                "display": "standalone",
                "theme_color": "#7D53DE",
                "background_color": "#ffffff"
            }
        })
    ],
})
