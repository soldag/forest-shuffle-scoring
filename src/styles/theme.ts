import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface Shadow {
    xsInverse: string;
    smInverse: string;
    mdInverse: string;
    lgInverse: string;
    xlInverse: string;
    card: string;
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#f4f9e6",
          "100": "#e2eec1",
          "200": "#cfe398",
          "300": "#bad86d",
          "400": "#aad049",
          "500": "#9ac81d",
          "600": "#89b813",
          "700": "#73a402",
          "800": "#5d9000",
          "900": "#376f00",
        },
        success: {
          "50": "#eefaea",
          "100": "#d4f2ca",
          "200": "#b7e9a7",
          "300": "#98df82",
          "400": "#7fd865",
          "500": "#66d049",
          "600": "#57bf41",
          "700": "#41ab36",
          "800": "#28962d",
          "900": "#007419",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          "50": "#f4f9e6",
          "100": "#e2eec1",
          "200": "#cfe398",
          "300": "#bad86d",
          "400": "#aad049",
          "500": "#9ac81d",
          "600": "#89b813",
          "700": "#73a402",
          "800": "#5d9000",
          "900": "#376f00",
        },
        success: {
          "50": "#eefaea",
          "100": "#d4f2ca",
          "200": "#b7e9a7",
          "300": "#98df82",
          "400": "#7fd865",
          "500": "#66d049",
          "600": "#57bf41",
          "700": "#41ab36",
          "800": "#28962d",
          "900": "#007419",
        },
      },
    },
  },
  shadow: {
    xsInverse: `
      var(--joy-shadowRing, 0 0 #000),
      0px -1px -2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))
    `,
    smInverse: `
      var(--joy-shadowRing, 0 0 #000),
      0px -1px 2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px -2px 4px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))
    `,
    mdInverse: `
      var(--joy-shadowRing, 0 0 #000),
      0px -2px 8px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px -6px 12px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))
    `,
    lgInverse: `
      var(--joy-shadowRing, 0 0 #000),
      0px -2px 8px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px -12px 16px -4px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))
    `,
    xlInverse: `
      var(--joy-shadowRing, 0 0 #000),
      0px -2px 8px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px -20px 24px -4px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))
    `,
    card: `
      var(--joy-shadowRing, 0 0 #000),
      0px 2px 8px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px 12px 16px -4px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px -2px 8px -2px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08)),
      0px -12px 16px -4px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))
    `,
  },
});

export default theme;
