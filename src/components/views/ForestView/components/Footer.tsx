import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useBoolean } from "usehooks-ts";
import { Link } from "wouter";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Divider, Stack } from "@mui/joy";

import { addPlayer, setCave } from "@/actions/game";
import AddPlayerModal from "@/components/common/AddPlayerModal";
import GameContext from "@/components/contexts/GameContext";
import { Cave } from "@/game";
import { MAX_PLAYERS } from "@/utils/constants";

import ForestSummary from "./ForestSummary";

const Footer = () => {
  const { game, playerId, dispatch } = useContext(GameContext);

  const {
    value: isAddPlayerModalOpen,
    setTrue: openAddPlayerModal,
    setFalse: closeAddPlayerModal,
  } = useBoolean(false);

  const hasMaxPlayers = game?.players?.length === MAX_PLAYERS;

  const handleCaveChange = (cave: Cave) => {
    if (!playerId) return;
    dispatch(setCave({ playerId, cave }));
  };

  return (
    <Box>
      {game && playerId && (
        <ForestSummary
          game={game}
          playerId={playerId}
          onCaveChange={handleCaveChange}
        />
      )}

      <Divider
        sx={{
          my: 2,
          boxShadow: "0 0 0 100vmax var(--Divider-lineColor)",
          clipPath: "inset(0px -100vmax)",
        }}
      />

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
          onClick={openAddPlayerModal}
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
          component={Link}
          to="/scoring"
        >
          <FormattedMessage
            id="ForestView.Footer.scoreGame"
            defaultMessage="Score game"
          />
        </Button>
      </Stack>

      {game && (
        <AddPlayerModal
          open={isAddPlayerModalOpen}
          game={game}
          onConfirm={(values) => dispatch(addPlayer(values))}
          onClose={closeAddPlayerModal}
        />
      )}
    </Box>
  );
};

export default Footer;
