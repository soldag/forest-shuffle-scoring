import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/joy";

import { resetGame } from "@/components/actions/game";
import FooterContainer from "@/components/common/FooterContainer";
import GameContext from "@/components/contexts/GameContext";

const Footer: React.FC = () => {
  const { dispatch } = useContext(GameContext);

  const handleReset = () => dispatch(resetGame());

  return (
    <FooterContainer>
      <Button
        fullWidth
        variant="soft"
        color="neutral"
        startDecorator={<ReplayIcon />}
        onClick={handleReset}
      >
        <FormattedMessage
          id="ScoringView.Footer.newGame"
          defaultMessage="Score a new game"
        />
      </Button>
    </FooterContainer>
  );
};

export default Footer;
