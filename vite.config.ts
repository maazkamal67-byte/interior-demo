import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          residential: path.resolve(__dirname, 'residential-design.html'),
          kitchenBath: path.resolve(__dirname, 'kitchen-and-bath.html'),
          spacePlanning: path.resolve(__dirname, 'space-planning.html'),
          styling: path.resolve(__dirname, 'styling-and-furnishing.html'),
          commercial: path.resolve(__dirname, 'commercial-interiors.html'),
          portfolio: path.resolve(__dirname, 'portfolio.html'),
          process: path.resolve(__dirname, 'process.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
  };
});
