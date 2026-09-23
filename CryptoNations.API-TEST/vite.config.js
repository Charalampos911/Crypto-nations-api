import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Build configuration
  build: {
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@vitejs/plugin-react']
        }
      }
    }
  },

  // Development server configuration
  server: {
    hmr: true,
    cors: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: '[local]_[hash:base64:5]',
      hashPrefix: 'prefix'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      components: '/src/components',
      assets: '/src/assets',
      lib: '/src/lib',
      hooks: '/src/hooks',
      utils: '/src/utils'
    }
  },

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },

  // Plugins
  plugins: [react()]
})