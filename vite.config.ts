import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import tailwindcss from 'tailwindcss';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx'
            ],
            refresh: true,
        }),
        react(),
        {
            name: 'tailwindcss',
            config: () => ({
                css: {
                    postcss: {
                        plugins: [tailwindcss],
                    },
                },
            }),
        },
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'resources/js/app.tsx'),
            },
        },
    },
});
