import { FormattedMessage } from "react-intl";

import { Switch, SwitchProps, Typography } from "@mui/joy";

const DetailsSwitch = (props: SwitchProps) => (
  <Typography
    component="label"
    level="body-sm"
    endDecorator={<Switch {...props} sx={{ ...props.sx, ml: 0.5 }} />}
  >
    <FormattedMessage
      id="ScoringView.DetailsSwitch.label"
      defaultMessage="Show details"
    />
  </Typography>
);

export default DetailsSwitch;
