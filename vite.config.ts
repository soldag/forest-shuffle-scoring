import react from "@vitejs/plugin-react-swc";
import * as child from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const commitHash = child
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

export default defineConfig({
  base: "/forest-shuffle-scoring",
  plugins: [
    react(),
    VitePWA({
      manifest: false,
      includeAssets: ["**/**.{ico,png,svg}"],
      workbox: {
        globPatterns: ["**/*.{html,png,svg}"],
      },
    }),
  ],
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(
      process.env.npm_package_version,
    ),
    "import.meta.env.COMMIT_HASH": JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
});
