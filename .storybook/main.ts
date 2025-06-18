import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public"],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "storybook-react-intl",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
};
export default config;
