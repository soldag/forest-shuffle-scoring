import { FormattedMessage } from "react-intl";
import { Link } from "wouter";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button, Stack } from "@mui/joy";

const Footer = () => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-around"
    gap={2}
  >
    <Button
      fullWidth
      variant="soft"
      color="neutral"
      startDecorator={<ArrowBackIcon />}
      onClick={() => history.back()}
    >
      <FormattedMessage id="ScoringView.Footer.back" defaultMessage="Go back" />
    </Button>
    <Button
      fullWidth
      variant="soft"
      color="neutral"
      startDecorator={<ReplayIcon />}
      component={Link}
      to="/new"
    >
      <FormattedMessage
        id="ScoringView.Footer.newGame"
        defaultMessage="New game"
      />
    </Button>
  </Stack>
);

export default Footer;
