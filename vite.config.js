import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/search": `${BACKEND_URL}`,
      // "/skill": `${BACKEND_URL}`,
    },
    historyApiFallback: true,
  },
});
