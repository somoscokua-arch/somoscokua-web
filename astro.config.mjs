import { defineConfig } from 'astro/config';

// Sitio 100 % estático (sin servidor ni base de datos).
export default defineConfig({
  output: 'static',
});
