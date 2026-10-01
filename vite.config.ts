import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative assets work at both / and /repository/ on GitHub Pages.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { manifest: true },
});
