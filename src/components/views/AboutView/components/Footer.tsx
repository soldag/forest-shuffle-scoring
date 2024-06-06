import { FormattedMessage } from "react-intl";
import { Link } from "wouter";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/joy";

const Footer = () => (
  <Button
    fullWidth
    variant="soft"
    color="neutral"
    startDecorator={<ArrowBackIcon />}
    component={Link}
    to="/new"
  >
    <FormattedMessage id="AboutView.Footer.back" defaultMessage="Go back" />
  </Button>
);

export default Footer;
