import React from "react";

import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { TreeSymbol as TreeSymbolType } from "@/game/types";
import { getColorOfTreeSymbol } from "@/styles/colors";
import { mergeSx } from "@/utils/sx";

type AttachPosition = "top" | "right" | "bottom" | "left";

const getBorderRadius = (direction: AttachPosition, value: string) => {
  const values: string[] = Array(4).fill(value);
  const index = ["top", "right", "bottom", "left"].indexOf(direction);
  values[index] = values[(index + 1) % 4] = "0";

  return values.join(" ");
};

interface TreeSymbolProps {
  attach: "top" | "right" | "bottom" | "left";
  value: TreeSymbolType;
  sx?: SxProps;
}

const TreeSymbol: React.FC<TreeSymbolProps> = ({ attach, value, sx }) => {
  const isTopOrBottom = ["top", "bottom"].includes(attach);
  const isTopOrLeft = ["top", "left"].includes(attach);

  const dimensions = [
    "calc(var(--TreeSymbol-iconSize) + 2 * var(--TreeSymbol-padding))",
    "34px",
  ];
  const [width, height] = isTopOrBottom
    ? dimensions
    : dimensions.slice().reverse();

  return (
    <Box
      sx={mergeSx(sx, (theme) => ({
        "--TreeSymbol-padding": "2px",
        "--TreeSymbol-iconSize": theme.fontSize.sm,
        "width": width,
        "height": height,
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
