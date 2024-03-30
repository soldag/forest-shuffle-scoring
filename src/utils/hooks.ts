import { useMediaQuery } from "react-responsive";

import { useTheme } from "@mui/joy";
import { Breakpoints } from "@mui/system";

export const useBreakpoint = (
  querySelector: (breakpoints: Breakpoints) => string,
) => {
  const theme = useTheme();
  const query = querySelector(theme.breakpoints).replace("@media", "");
  return useMediaQuery({ query });
};
