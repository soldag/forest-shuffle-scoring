import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Divider, Stack } from "@mui/joy";

import { addPlayer, scoreGame, setCave } from "@/components/actions/game";
import AddPlayerModal from "@/components/common/AddPlayerModal";
import FooterContainer from "@/components/common/FooterContainer";
import GameContext from "@/components/contexts/GameContext";
import { MAX_PLAYERS } from "@/utils/constants";

import ForestSummary from "./ForestSummary";

const Footer: React.FC = () => {
  const { game, playerId, dispatch } = useContext(GameContext);

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const playerNames = game?.players?.map((p) => p.name) ?? [];
  const hasMaxPlayers = game?.players?.length === MAX_PLAYERS;
  const forest = game?.players?.find((p) => p.id === playerId)?.forest;

  const handleForestChange = ({ caveCardCount }: { caveCardCount: number }) => {
    if (!playerId) return;
    dispatch(setCave({ playerId, count: caveCardCount }));
  };

  return (
    <FooterContainer>
      {forest && (
        <ForestSummary forest={forest} onChange={handleForestChange} />
      )}

      <Divider sx={{ my: 2, mx: -2 }} />

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
          onClick={() => dispatch(scoreGame())}
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
        onConfirm={(values) => dispatch(addPlayer(values))}
        onClose={() => setIsAddPlayerModalOpen(false)}
      />
    </FooterContainer>
  );
};

export default Footer;
