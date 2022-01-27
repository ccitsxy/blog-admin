import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Components from 'unplugin-vue-components/vite';
import {
  AntDesignVueResolver,
  PrimeVueResolver,
} from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: true,
      resolvers: [AntDesignVueResolver(), PrimeVueResolver({
        importTheme: 'lara-light-blue'
      })],
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: true
  },
});
