import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Stack } from "@mui/joy";

import { addPlayer, scoreGame } from "@/components/actions/game";
import AddPlayerModal from "@/components/common/AddPlayerModal";
import FooterContainer from "@/components/common/FooterContainer";
import GameContext from "@/components/contexts/GameContext";
import { MAX_PLAYERS } from "@/utils/constants";

const Footer: React.FC = () => {
  const { game, dispatch } = useContext(GameContext);

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const playerNames = game?.players?.map((p) => p.name) ?? [];
  const hasMaxPlayers = game?.players?.length === MAX_PLAYERS;

  const handleAddPlayer = (values: { playerName: string }) =>
    dispatch(addPlayer(values));

  const handleScoreGame = () => dispatch(scoreGame());

  return (
    <FooterContainer>
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
          startDecorator={<PersonAddIcon />}
          disabled={hasMaxPlayers}
          onClick={() => setIsAddPlayerModalOpen(true)}
        >
          <FormattedMessage
            id="ForestView.Footer.nextPlayer"
            defaultMessage="Next player"
          />
        </Button>
        <Button
          fullWidth
          startDecorator={<EmojiEventsIcon />}
          color="primary"
          onClick={handleScoreGame}
        >
          <FormattedMessage
            id="ForestView.Footer.scoreGame"
            defaultMessage="Score game"
          />
        </Button>
      </Stack>

      <AddPlayerModal
        open={isAddPlayerModalOpen}
        existingPlayerNames={playerNames}
        onConfirm={handleAddPlayer}
        onClose={() => setIsAddPlayerModalOpen(false)}
      />
    </FooterContainer>
  );
};

export default Footer;
