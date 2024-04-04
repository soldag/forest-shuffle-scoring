import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "wouter";

import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/joy";

import FooterContainer from "@/components/common/FooterContainer";

const Footer: React.FC = () => (
  <FooterContainer>
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
        defaultMessage="Score a new game"
      />
    </Button>
  </FooterContainer>
);

export default Footer;
