import React from "react";

import CircleIcon from "@mui/icons-material/Circle";
import { SxProps } from "@mui/system";

import { TreeSymbol as TreeSymbolType } from "@/game/types";
import { getColorOfTreeSymbol } from "@/styles/colors";

interface TreeSymbolProps {
  value: TreeSymbolType;
  sx?: SxProps;
}

const TreeSymbol: React.FC<TreeSymbolProps> = ({ value, sx }) => (
  <CircleIcon
    fontSize="small"
    sx={{ ...sx, color: getColorOfTreeSymbol(value) }}
  />
);

export default TreeSymbol;
