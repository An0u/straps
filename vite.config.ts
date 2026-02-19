import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers — skips heavy legacy transpilation
    target: "es2020",
    // No source maps in production (saves bandwidth + hides internals)
    sourcemap: false,
    // Minify with esbuild (fast and effective)
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core — always needed, load first
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // Router — small, but separate from React core
          if (id.includes("node_modules/react-router-dom/") || id.includes("node_modules/react-router/")) {
            return "vendor-router";
          }
          // Radix UI — large, lazy-loaded via component usage
          if (id.includes("node_modules/@radix-ui/")) {
            return "vendor-radix";
          }
          // TanStack Query
          if (id.includes("node_modules/@tanstack/")) {
            return "vendor-query";
          }
          // Lucide icons — often large, keep separate
          if (id.includes("node_modules/lucide-react/")) {
            return "vendor-icons";
          }
          // Sonner toasts
          if (id.includes("node_modules/sonner/")) {
            return "vendor-sonner";
          }
          // Everything else in node_modules goes into a general vendor chunk
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
        },
      },
    },
    // Raise warning threshold slightly — we're chunking intentionally
    chunkSizeWarningLimit: 500,
  },
});