import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { enquiryApiPlugin } from './server/vite-plugin.mjs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), enquiryApiPlugin(env)]
  };
});
