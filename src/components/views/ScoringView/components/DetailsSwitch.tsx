import { FormattedMessage } from "react-intl";

import { Switch, SwitchProps, Typography } from "@mui/joy";

const DetailsSwitch: React.FC<SwitchProps> = (props) => (
  <Typography
    component="label"
    level="body-sm"
    endDecorator={<Switch {...props} sx={{ ...props.sx, ml: 1 }} />}
  >
    <FormattedMessage
      id="ScoringView.DetailsSwitch.label"
      defaultMessage="Show details"
    />
  </Typography>
);

export default DetailsSwitch;
