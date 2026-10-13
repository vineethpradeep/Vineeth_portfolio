import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // In development, API calls go to the local Express server (npm run server).
  server: {
    proxy: { "/api": "http://localhost:5050" },
  },
});
