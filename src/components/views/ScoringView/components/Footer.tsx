import { FormattedMessage } from "react-intl";
import { Link } from "wouter";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button, Stack } from "@mui/joy";
import { useLocalStorage } from "usehooks-ts";

const Footer = () => {
  const [, , deleteGame] = useLocalStorage("game", {});

  return <Stack
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
      onClick={(() => deleteGame())}
    >
      <FormattedMessage
        id="ScoringView.Footer.newGame"
        defaultMessage="New game"
      />
    </Button>
  </Stack>
};

export default Footer;
