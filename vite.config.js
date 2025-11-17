import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base path for deployment
  base: './',
  
  // Server configuration for local development
  server: {
    port: 5173,
    host: true, // Listen on all addresses
    strictPort: true,
    https: false, // Telegram Mini Apps work with HTTP in dev (use ngrok for testing)
    open: false, // Don't auto-open browser
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser',
    
    // Optimize chunks for better loading
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        },
        // Better asset naming
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    },
    
    // Terser compression settings
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false // Remove comments
      }
    },
    
    // Asset optimization
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  
  // Preview server config (for testing production build)
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
  
  // Define global constants available in the app
  define: {
    'process.env': {},
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react'
    ],
    exclude: [], // Add packages to exclude from pre-bundling if needed
  },
  
  // CSS configuration
  css: {
    devSourcemap: false, // Disable CSS sourcemaps
    preprocessorOptions: {
      // Add global SCSS variables if needed
    }
  },
})
