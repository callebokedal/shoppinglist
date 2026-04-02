import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "docs",
    target: "esnext",
  },
  server: {
    port: 5178,
    watch: {
      usePolling: true,
    },
  },
});
