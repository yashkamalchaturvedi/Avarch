import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'js/*',
          dest: 'js'
        }
      ]
    })
  ]
});
