import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@constants": "/src/constants",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@Layout": "/src/Layout",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@store": "/src/store",
    },
  },
});
