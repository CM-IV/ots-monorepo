import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    outDir: "./.shop",
    server: {
        port: 1234
    }
});