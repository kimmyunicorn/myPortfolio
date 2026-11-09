import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE controls where the site lives:
//   "/"           for a user/organization site (kimberlycamanero.github.io)
//   "/portfolio/" for a project site (kimmyunicorn.github.io/portfolio)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE || '/',
    plugins: [react()],
    build: {
      target: 'es2022',
      cssMinify: true,
    },
  };
});
