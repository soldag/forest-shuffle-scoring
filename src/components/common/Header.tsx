import React, { useContext, useState } from "react";
import CountUp from "react-countup";
import { FormattedMessage } from "react-intl";

import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Container, IconButton, Stack, Typography } from "@mui/joy";

import { changePlayer, resetGame } from "@/components/actions/game";
import ConfirmResetModal from "@/components/common/ConfirmResetModal";
import PlayerSelect from "@/components/common/PlayerSelect";
import GameContext from "@/components/contexts/GameContext";
import { Game, scorePlayer } from "@/game";

const getTotalScore = (game: Game, playerId: string): number => {
  const scoring = scorePlayer(game, playerId);
  return Object.values(scoring).reduce((a, b) => a + b, 0);
};

const Header: React.FC = () => {
  const { game, playerId, dispatch } = useContext(GameContext);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const playerScore = game && playerId ? getTotalScore(game, playerId) : null;

  const handleChangePlayer = (playerId: string | null) => {
    if (playerId) {
      dispatch(changePlayer({ playerId }));
    }
  };
  const handleReset = () => dispatch(resetGame());

  return (
    <Box
      sx={{
        bgcolor: "background.surface",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: "sm",
      }}
    >
      <Container sx={{ px: { xs: 0 } }}>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
          columnGap={2}
          sx={{ p: 2 }}
        >
          <Typography level="title-lg" sx={{ flexGrow: 1 }}>
            <FormattedMessage
              id="Header.title"
              defaultMessage="Forest Shuffle Scoring"
            />
          </Typography>

          {game && (
            <>
              <IconButton
                size="sm"
                sx={{ order: { sm: 5 } }}
                onClick={() => setIsResetModalOpen(true)}
              >
                <ReplayIcon />
              </IconButton>

              <Box sx={{ display: { sm: "none" }, flexBasis: "100%", mb: 2 }} />

              <PlayerSelect
                variant="plain"
                players={game.players}
                value={playerId}
                onChange={(_, value) => handleChangePlayer(value)}
                sx={{
                  flexGrow: { xs: 1, sm: 0 },
                  flexBasis: { xs: "0", sm: "auto" },
                  minWidth: "200px",
                }}
              />

              {playerScore != null && (
                <Typography level="title-lg" width="3ch" textAlign="right">
                  <CountUp preserveValue duration={1} end={playerScore} />
                </Typography>
              )}
            </>
          )}
        </Stack>
      </Container>

      <ConfirmResetModal
        open={isResetModalOpen}
        onConfirm={handleReset}
        onClose={() => setIsResetModalOpen(false)}
      />
    </Box>
  );
};

export default Header;
