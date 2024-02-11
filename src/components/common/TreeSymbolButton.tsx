import React from "react";
import { useIntl } from "react-intl";

import { Button, ButtonProps } from "@mui/joy";

import { TreeSymbol } from "@/cards";
import {
  ACTIVE_BRIGHTNESS,
  HOVER_BRIGHTNESS,
  getColorOfTreeSymbol,
} from "@/styles/colors";
import { getLocalizedTreeSymbol } from "@/translations/messages/TreeSymbols";

interface TreeSymbolButtonProps extends ButtonProps {
  treeSymbol: TreeSymbol;
}

const TreeSymbolButton: React.FC<TreeSymbolButtonProps> = ({
  treeSymbol,
  ...otherProps
}) => {
  const intl = useIntl();

  const text = getLocalizedTreeSymbol(intl, treeSymbol) ?? treeSymbol;

  return (
    <Button
      {...otherProps}
      sx={{
        "backgroundColor": getColorOfTreeSymbol(treeSymbol),
        ":hover": {
          backgroundColor: getColorOfTreeSymbol(treeSymbol, HOVER_BRIGHTNESS),
        },
        ":active": {
          backgroundColor: getColorOfTreeSymbol(treeSymbol, ACTIVE_BRIGHTNESS),
        },
      }}
    >
      {text}
    </Button>
  );
};

export default TreeSymbolButton;
