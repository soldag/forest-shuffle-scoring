import { promises as fs } from "fs";
import path from "path";
import * as prettier from "prettier";
import { fileURLToPath } from "url";

import { Locale } from "../src/types";
import viteConfig from "../vite.config";

type Translations = { [key: string]: string };

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const translationsDir = path.resolve(rootDir, "src/translations");
const outputDir = path.resolve(rootDir, "public/manifests");

const getTranslations = async (locale: Locale) => {
  const filename = path.resolve(translationsDir, `${locale}.json`);
  const data = await fs.readFile(filename, "utf-8");
  return JSON.parse(data) as Translations;
};

const getIconPath = (filename: string) => {
  const { base = "" } = viteConfig;
  return `${base}/icons/${filename}`;
};

const writeFormattedFile = async (
  filename: string,
  data: string,
  parser: string,
) => {
  const prettierOptions = {
    parser,
    ...(await prettier.resolveConfig(filename)),
  };
  const formattedData = await prettier.format(data, prettierOptions);
  await fs.writeFile(filename, formattedData);
};

for (const locale of Object.values(Locale)) {
  const translations = await getTranslations(locale);

  const manifest = {
    name: translations["Common.appName"],
    short_name: translations["Common.gameName"],
    description: translations["Common.appDescription"],
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
  await writeFormattedFile(filename, JSON.stringify(manifest), "json");
}
