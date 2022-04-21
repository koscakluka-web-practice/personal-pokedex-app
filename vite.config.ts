import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@views": path.resolve(__dirname, "src/views"),
      "@layouts": path.resolve(__dirname, "src/views/layouts"),
      "@pages": path.resolve(__dirname, "src/views/pages"),
      "@utilities": path.resolve(__dirname, "src/utilities"),
    },
  },
  plugins: [react()],
});
