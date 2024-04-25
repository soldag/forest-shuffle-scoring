import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

import { Locale } from "../src/types";
import viteConfig from "../vite.config";

const ROOT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const TRANSLATIONS_DIR = path.resolve(ROOT_DIR, "src/translations");
const OUTPUT_DIR = path.resolve(ROOT_DIR, "public/manifests");

const LOCALES: Locale[] = ["en", "de"];

const getLocalizedString = (locale: Locale, messageId: string) => {
  const filename = path.resolve(TRANSLATIONS_DIR, `${locale}.json`);
  const translations = JSON.parse(fs.readFileSync(filename, "utf-8"));
  return translations[messageId];
};

const getIconPath = (filename: string) => {
  const { base = "" } = viteConfig;
  return `${base}/src/assets/icons/${filename}`;
};

for (const locale of LOCALES) {
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
        src: getIconPath("maskable-icon-512x512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    start_url: viteConfig.base,
  };

  const filename = path.resolve(OUTPUT_DIR, `${locale}.webmanifest`);
  fs.writeFileSync(filename, JSON.stringify(manifest, null, 2) + os.EOL);
}
