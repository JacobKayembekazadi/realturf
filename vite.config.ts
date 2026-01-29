import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load from .env files
    const fileEnv = loadEnv(mode, '.', '');

    // Merge with process.env (Vercel sets vars here)
    const env = {
      API_KEY: process.env.API_KEY || fileEnv.API_KEY || process.env.GEMINI_API_KEY || fileEnv.GEMINI_API_KEY || process.env.OPENAI_API_KEY || fileEnv.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || fileEnv.ANTHROPIC_API_KEY,
      AI_PROVIDER: process.env.AI_PROVIDER || fileEnv.AI_PROVIDER || 'gemini',
      AI_MODEL: process.env.AI_MODEL || fileEnv.AI_MODEL || '',
    };

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.API_KEY),
        'process.env.AI_PROVIDER': JSON.stringify(env.AI_PROVIDER),
        'process.env.AI_MODEL': JSON.stringify(env.AI_MODEL),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
