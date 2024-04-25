import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/forest-shuffle-scoring",
  plugins: [react(), VitePWA()],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
  assetsInclude: ["src/assets/icons/**"],
});
