import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        aboutfounder: './aboutfounder.html',
        'associate-partner': './associate-partner.html',
        blockaction: './blockaction.html',
        contact: './contact.html',
        etherworld: './etherworld.html',
        projects: './projects.html',
        services: './services.html',
        'single-project': './single-project.html'
      }
    }
  }
});
