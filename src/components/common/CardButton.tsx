import { useIntl } from "react-intl";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Button, ButtonProps } from "@mui/joy";

import { Card, CardType, GameBox } from "@/game";
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

const CardButton = ({ card, ...otherProps }: CardButtonProps) => {
  const intl = useIntl();
  const isPromoCard = card.gameBox === GameBox.PromoCards;

  return (
    <Button
      {...otherProps}
      endDecorator={isPromoCard && <AutoAwesomeIcon />}
      slotProps={{
        endDecorator: {
          sx: { position: "absolute", right: "0.75rem" },
        },
      }}
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
