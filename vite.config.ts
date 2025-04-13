import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue()],
    build: {
        emptyOutDir: true,
        lib: {
            name: 'ui',
            fileName: 'ui',
            formats: ['es'],
            entry: resolve(__dirname, 'src/ui/main.ts')
        },
        assetsDir: 'src/ui/assets',
        outDir: resolve(__dirname, 'dist/ui')
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/ui')
        }
    }
});
