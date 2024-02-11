import React from "react";
import { useIntl } from "react-intl";

import { Button, ButtonProps } from "@mui/joy";

import { Card, CardType } from "@/cards";
import {
  ACTIVE_BRIGHTNESS,
  HOVER_BRIGHTNESS,
  getBackgroundForCardTypes,
  getColorOfTreeSymbol,
} from "@/styles/colors";
import { getLocalizedCardName } from "@/translations/messages/CardNames";

interface CardButtonProps extends ButtonProps {
  card: Card;
}

const getBackground = (card: Card, adjustBrightness: number = 0) => {
  if (card.types.includes(CardType.Tree) && card.treeSymbol) {
    return getColorOfTreeSymbol(card.treeSymbol, adjustBrightness);
  }
  return getBackgroundForCardTypes(card.types, "horizontal", adjustBrightness);
};

const CardButton: React.FC<CardButtonProps> = ({ card, ...otherProps }) => {
  const intl = useIntl();

  return (
    <Button
      {...otherProps}
      sx={{
        "background": getBackground(card),
        ":hover": {
          background: getBackground(card, HOVER_BRIGHTNESS),
        },
        ":active": {
          background: getBackground(card, ACTIVE_BRIGHTNESS),
        },
      }}
    >
      {getLocalizedCardName(intl, card.name) ?? card.name}
    </Button>
  );
};

export default CardButton;
