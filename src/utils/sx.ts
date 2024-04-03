import { SxProps, Theme } from "@mui/joy/styles/types";
import { SxProps as SystemSxProps } from "@mui/system";

export const mergeSx: (
  ...sx: (SxProps | SystemSxProps<Theme> | undefined)[]
) => SystemSxProps = (...sx) => {
  return sx
    .filter((x) => !!x)
    .map((x) => (Array.isArray(x) ? x : [x]))
    .flatMap((x) => x);
};
