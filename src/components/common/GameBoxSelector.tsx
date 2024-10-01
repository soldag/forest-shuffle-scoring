import * as _ from "lodash-es";
import { useIntl } from "react-intl";

import { Stack, Switch, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { GameBox } from "@/game";
import GameBoxMessages from "@/translations/messages/GameBoxes";

interface GameBoxSelectorProps {
  value?: GameBox[];
  onChange?: (value: GameBox[]) => void;
  ignore?: GameBox[];
  sx?: SxProps;
}

const GameBoxSelector = ({
  value = [],
  onChange,
  ignore,
  sx,
}: GameBoxSelectorProps) => {
  const intl = useIntl();

  const handleChange = (gameBox: GameBox, isChecked: boolean) => {
    const newValue = isChecked
      ? [...value, gameBox]
      : value.filter((e) => e !== gameBox);

    onChange?.([...new Set(newValue)]);
  };

  const options = _.orderBy(
    Object.values(GameBox)
      .filter((gameBox) => !ignore?.includes(gameBox))
      .map((gameBox) => ({
        value: gameBox,
        text: intl.formatMessage(GameBoxMessages[gameBox]),
      })),
    (o) => o.text,
  );

  return (
    <Stack gap={1} sx={sx}>
      {options.map(({ text, value: optionValue }) => (
        <Typography
          key={optionValue}
          level="body-sm"
          component="label"
          startDecorator={
            <Switch
              sx={{ mr: 0.5 }}
              checked={value.includes(optionValue)}
              onChange={(e) => handleChange(optionValue, e.target.checked)}
            />
          }
        >
          {text}
        </Typography>
      ))}
    </Stack>
  );
};

export default GameBoxSelector;
