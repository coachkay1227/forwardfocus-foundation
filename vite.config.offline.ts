import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Offline-optimized Vite config for completely self-contained build
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Remove component tagger for production builds
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Inline all assets for offline use
    assetsInlineLimit: 100000, // Inline assets up to 100kb
    cssCodeSplit: false, // Bundle all CSS into one file
    rollupOptions: {
      output: {
        // Create single bundle for complete offline capability
        manualChunks: undefined,
        inlineDynamicImports: true,
      }
    }
  },
  // Ensure no external dependencies in build
  optimizeDeps: {
    include: [
      '@fontsource/inter',
      '@fontsource/poppins'
    ]
  }
});