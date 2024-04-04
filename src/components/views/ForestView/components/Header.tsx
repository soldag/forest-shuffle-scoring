import React, { useContext } from "react";
import CountUp from "react-countup";
import { useBoolean } from "usehooks-ts";
import { useLocation } from "wouter";

import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton, Stack, Typography } from "@mui/joy";

import { SelectPlayer, resetGame } from "@/components/actions/game";
import ConfirmResetModal from "@/components/common/ConfirmResetModal";
import HeaderContainer from "@/components/common/HeaderContainer";
import HeaderTitle from "@/components/common/HeaderTitle";
import PlayerSelect from "@/components/common/PlayerSelect";
import GameContext from "@/components/contexts/GameContext";
import { scorePlayer } from "@/game";

const Header: React.FC = () => {
  const [, navigate] = useLocation();
  const { game, playerId, dispatch } = useContext(GameContext);

  const {
    value: isResetModalOpen,
    setTrue: openResetModal,
    setFalse: closeResetModal,
  } = useBoolean(false);

  const playerScore =
    game && playerId ? scorePlayer(game, playerId).total : null;

  const handleSelectPlayer = (playerId: string | null) => {
    if (playerId) {
      dispatch(SelectPlayer({ playerId }));
    }
  };
  const handleReset = () => {
    dispatch(resetGame());
    navigate("/new");
  };

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
          onClick={openResetModal}
        >
          <ReplayIcon />
        </IconButton>

        <Box sx={{ display: { sm: "none" }, flexBasis: "100%", mb: 2 }} />

        {game && (
          <PlayerSelect
            variant="plain"
            players={game.players}
            value={playerId}
            onChange={(_, value) => handleSelectPlayer(value)}
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
        onClose={closeResetModal}
      />
    </HeaderContainer>
  );
};

export default Header;
