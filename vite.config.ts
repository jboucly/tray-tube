import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    base: './',
    root: 'src/ui',
    plugins: [vue()],
    build: {
        emptyOutDir: true,
        assetsDir: 'src/ui/assets',
        outDir: resolve(__dirname, 'dist/ui')
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/ui')
        }
    }
});
