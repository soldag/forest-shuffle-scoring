import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/joy";
import { SxProps, Theme } from "@mui/joy/styles/types";

import { TreeSymbol as TreeSymbolType } from "@/game/types";
import { getColorOfTreeSymbol } from "@/styles/colors";
import { mergeSx } from "@/utils/sx";

export type TreeSymbolAttachPosition = "top" | "right" | "bottom" | "left";

export type TreeSymbolSize = "sm" | "md" | "lg";

const getBorderRadius = (position: TreeSymbolAttachPosition, value: string) => {
  const values: string[] = Array(4).fill(value);
  const index = ["top", "right", "bottom", "left"].indexOf(position);
  values[index] = values[(index + 1) % 4] = "0";

  return values.join(" ");
};

const getIconSize = (theme: Theme, size: TreeSymbolSize) =>
  ({
    sm: theme.fontSize.xs,
    md: theme.fontSize.sm,
    lg: theme.fontSize.md,
  })[size];

interface TreeSymbolProps {
  attach: TreeSymbolAttachPosition;
  value: TreeSymbolType;
  size?: TreeSymbolSize;
  sx?: SxProps;
}

const TreeSymbol = ({ attach, value, size = "md", sx }: TreeSymbolProps) => {
  const isTopOrBottom = ["top", "bottom"].includes(attach);
  const isTopOrLeft = ["top", "left"].includes(attach);

  return (
    <Box
      sx={mergeSx(sx, (theme) => ({
        "--TreeSymbol-padding": "2px",
        "--TreeSymbol-iconSize": getIconSize(theme, size),
        [isTopOrBottom ? "width" : "height"]:
          "calc(var(--TreeSymbol-iconSize) + 2 * var(--TreeSymbol-padding))",
        "p": "var(--TreeSymbol-padding)",
        "display": "flex",
        "flexDirection": isTopOrBottom ? "row" : "column",
        "alignItems": isTopOrLeft ? "end" : "start",
        "justifyContent": "center",
        "borderRadius": getBorderRadius(attach, "var(--TreeSymbol-iconSize)"),
        "backgroundColor": "neutral.100",
      }))}
    >
      <CircleIcon
        sx={{
          color: getColorOfTreeSymbol(value),
          fontSize: "var(--TreeSymbol-iconSize)",
        }}
      />
    </Box>
  );
};

export default TreeSymbol;
