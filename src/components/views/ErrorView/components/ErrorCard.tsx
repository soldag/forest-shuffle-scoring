import { FormattedMessage } from "react-intl";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WarningIcon from "@mui/icons-material/Warning";
import {
  AspectRatio,
  Button,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";

const ErrorCard = () => {
  const handleReload = () => document.location.reload();

  return (
    <Card
      sx={{
        "textAlign": "center",
        "alignItems": "center",
        "width": "min(425px, 100%)",
        "--Error-Card-iconSize": "100px",
      }}
    >
      <CardOverflow variant="solid" color="warning">
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: "auto",
            transform: "translateY(50%)",
            borderRadius: "50%",
            width: "var(--Error-Card-iconSize)",
            boxShadow: "sm",
            bgcolor: "background.surface",
            position: "relative",
          }}
        >
          <div>
            <WarningIcon color="warning" sx={{ fontSize: "4rem" }} />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography
        level="title-lg"
        sx={{ mt: "calc(var(--Error-Card-iconSize) / 2)" }}
      >
        <FormattedMessage
          id="ErrorView.ErrorCard.title"
          defaultMessage="An unexpected error has occurred"
        />
      </Typography>
      <CardContent sx={{ maxWidth: "40ch" }}>
        <FormattedMessage
          id="ErrorView.ErrorCard.description"
          defaultMessage="The app needs to be restarted to work again. Unfortunately, any progress of the game will get lost."
        />
      </CardContent>
      <CardActions sx={{ width: "100%" }}>
        <Button
          variant="solid"
          color="warning"
          startDecorator={<RestartAltIcon />}
          onClick={handleReload}
        >
          <FormattedMessage
            id="ErrorView.ErrorCard.restart"
            defaultMessage="Restart app"
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ErrorCard;
