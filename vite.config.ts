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
        manualChunks: {
          // Keep React + router together so they're always available first
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Radix UI components
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-progress",
            "@radix-ui/react-aspect-ratio",
          ],
          // Other large deps
          "vendor-ui": ["@tanstack/react-query", "sonner", "lucide-react"],
        },
      },
    },
    // Raise warning threshold slightly — we're chunking intentionally
    chunkSizeWarningLimit: 500,
  },
});