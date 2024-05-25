import * as _ from "lodash-es";
import { useIntl } from "react-intl";

import { Stack, Switch, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { Expansion } from "@/game";
import ExpansionNames from "@/translations/messages/ExpansionNames";

interface ExpansionSelectorProps {
  value?: Expansion[];
  onChange?: (value: Expansion[]) => void;
  sx?: SxProps;
}

const ExpansionSelector: React.FC<ExpansionSelectorProps> = ({
  value = [],
  onChange,
  sx,
}) => {
  const intl = useIntl();

  const handleChange = (expansion: Expansion, isChecked: boolean) => {
    const newValue = isChecked
      ? [...value, expansion]
      : value.filter((e) => e !== expansion);

    onChange?.([...new Set(newValue)]);
  };

  const options = _.orderBy(
    Object.values(Expansion).map((expansion) => ({
      value: expansion,
      text: intl.formatMessage(ExpansionNames[expansion]),
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
              variant="soft"
              color={value.includes(optionValue) ? "primary" : "neutral"}
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

export default ExpansionSelector;
