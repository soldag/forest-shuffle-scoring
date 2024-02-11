import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface Shadow {
    card: string;
  }
}

const theme = extendTheme({
  shadow: {
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
