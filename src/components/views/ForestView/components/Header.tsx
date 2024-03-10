import React, { useContext, useState } from "react";
import CountUp from "react-countup";

import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton, Stack, Typography } from "@mui/joy";

import { changePlayer, resetGame } from "@/components/actions/game";
import ConfirmResetModal from "@/components/common/ConfirmResetModal";
import HeaderContainer from "@/components/common/HeaderContainer";
import HeaderTitle from "@/components/common/HeaderTitle";
import PlayerSelect from "@/components/common/PlayerSelect";
import GameContext from "@/components/contexts/GameContext";
import { scorePlayer } from "@/game";

const Header: React.FC = () => {
  const { game, playerId, dispatch } = useContext(GameContext);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const playerScore =
    game && playerId ? scorePlayer(game, playerId).total : null;

  const handleChangePlayer = (playerId: string | null) => {
    if (playerId) {
      dispatch(changePlayer({ playerId }));
    }
  };
  const handleReset = () => dispatch(resetGame());

  return (
    <HeaderContainer>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
        columnGap={2}
      >
        <HeaderTitle sx={{ flexGrow: 1 }} />

        <IconButton
          size="sm"
          sx={{ order: { sm: 5 } }}
          onClick={() => setIsResetModalOpen(true)}
        >
          <ReplayIcon />
        </IconButton>

        <Box sx={{ display: { sm: "none" }, flexBasis: "100%", mb: 2 }} />

        {game && (
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
        )}

        {playerScore != null && (
          <Typography level="title-lg" width="3ch" textAlign="right">
            <CountUp preserveValue duration={1} end={playerScore} />
          </Typography>
        )}
      </Stack>
      <ConfirmResetModal
        open={isResetModalOpen}
        onConfirm={handleReset}
        onClose={() => setIsResetModalOpen(false)}
      />
    </HeaderContainer>
  );
};

export default Header;