import { ThemeProvider } from "@emotion/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";

import { CssBaseline } from "@mui/joy";

import theme from "../src/styles/theme";
import translations from "../src/translations";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) =>
        a.type.localeCompare(b.type) && a.name.localeCompare(b.name),
    },
    reactIntl: {
      defaultLocale: "en",
      locales: Object.keys(translations),
      messages: translations,
    },
  },
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        default: theme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
  initialGlobals: {
    locale: "en",
    locales: {
      en: { title: "English" },
      de: { title: "German" },
      nl: { title: "Dutch" },
      ptBr: { title: "Portuguese - Brazil" },
    },
  },
};

export default preview;
