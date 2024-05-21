import React from "react";
import { useIntl } from "react-intl";

import { Button, ButtonProps } from "@mui/joy";

import { TreeSymbol } from "@/game";
import {
  ACTIVE_BRIGHTNESS,
  HOVER_BRIGHTNESS,
  getColorOfTreeSymbol,
} from "@/styles/colors";
import TreeSymbolMessages from "@/translations/messages/TreeSymbols";

interface TreeSymbolButtonProps extends ButtonProps {
  treeSymbol: TreeSymbol;
}

const TreeSymbolButton: React.FC<TreeSymbolButtonProps> = ({
  treeSymbol,
  ...otherProps
}) => {
  const intl = useIntl();

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
      {intl.formatMessage(TreeSymbolMessages[treeSymbol])}
    </Button>
  );
};

export default TreeSymbolButton;
