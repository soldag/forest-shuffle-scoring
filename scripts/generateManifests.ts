import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

import { Locale } from "../src/types";
import viteConfig from "../vite.config";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const translationsDir = path.resolve(rootDir, "src/translations");
const outputDir = path.resolve(rootDir, "public/manifests");

const locales: Locale[] = ["en", "de"];

const getLocalizedString = (locale: Locale, messageId: string) => {
  const filename = path.resolve(translationsDir, `${locale}.json`);
  const translations = JSON.parse(fs.readFileSync(filename, "utf-8"));
  return translations[messageId];
};

const getIconPath = (filename: string) => {
  const { base = "" } = viteConfig;
  return `${base}/icons/${filename}`;
};

for (const locale of locales) {
  const manifest = {
    name: getLocalizedString(locale, "Common.appName"),
    short_name: getLocalizedString(locale, "Common.gameName"),
    description: getLocalizedString(locale, "Common.appDescription"),
    theme_color: "#9ac81d",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: getIconPath("pwa-64x64.png"),
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: getIconPath("pwa-192x192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: getIconPath("pwa-512x512.png"),
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: getIconPath("maskable-icon-96x96.png"),
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: getIconPath("maskable-icon-192x192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: getIconPath("maskable-icon-512x512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    start_url: viteConfig.base,
  };

  const filename = path.resolve(outputDir, `${locale}.webmanifest`);
  fs.writeFileSync(filename, JSON.stringify(manifest, null, 2) + os.EOL);
}
