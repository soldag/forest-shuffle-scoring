import { useIntl } from "react-intl";

import { Button, ButtonProps } from "@mui/joy";

import { GameBox } from "@/game";
import {
  ACTIVE_BRIGHTNESS,
  HOVER_BRIGHTNESS,
  getColorOfGameBox,
} from "@/styles/colors";
import GameBoxMessages from "@/translations/messages/GameBoxes";

interface GameBoxButtonProps extends ButtonProps {
  gameBox: GameBox;
}

const GameBoxButton = ({ gameBox, ...otherProps }: GameBoxButtonProps) => {
  const intl = useIntl();

  return (
    <Button
      {...otherProps}
      sx={{
        "background": getColorOfGameBox(gameBox),
        ":hover": {
          background: getColorOfGameBox(gameBox, HOVER_BRIGHTNESS),
        },
        ":active": {
          background: getColorOfGameBox(gameBox, ACTIVE_BRIGHTNESS),
        },
      }}
    >
      {intl.formatMessage(GameBoxMessages[gameBox])}
    </Button>
  );
};

export default GameBoxButton;
