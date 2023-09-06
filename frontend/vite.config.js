import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
    registerType: 'prompt',
    includeAssets: ['vite.svg', "apple_icon_1.png", "maskable_icon.png"],
    manifest: {
        name: "TaskEasy",
        short_name: "TaskEasy",
        description: "A Simple Todo App",
        icons: [{
                src: '/android_x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android_x512',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/maskable_2.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'apple touch icon',
            },
            {
                src: '/maskable_icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            }
        ],
        theme_color: '#f0e7db',
        background_color: '#17181f',
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait'
    }
}

export default defineConfig({
    base: "./",
    plugins: [react(), VitePWA(manifestForPlugin)],
})