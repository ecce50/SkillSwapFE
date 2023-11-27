import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/search": "http://localhost:5005", // Adjust the path and port accordingly
      "/skill": "http://localhost:5005", // Adjust the path and port accordingly
    },
  },
});
