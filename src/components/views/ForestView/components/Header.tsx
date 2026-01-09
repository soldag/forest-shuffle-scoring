import { useContext } from "react";
import CountUp from "react-countup";
import { useBoolean, useLocalStorage } from "usehooks-ts";
import { useLocation } from "wouter";

import PersonIcon from "@mui/icons-material/Person";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton, Stack, Typography } from "@mui/joy";

import { selectPlayer } from "@/actions/game";
import ConfirmResetModal from "@/components/common/ConfirmResetModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import PlayerSelect from "@/components/common/PlayerSelect";
import GameContext from "@/components/contexts/GameContext";
import { scorePlayer } from "@/game";

const Header = () => {
  const [, navigate] = useLocation();
  const { game, playerId, dispatch } = useContext(GameContext);
  const [, , deleteGame] = useLocalStorage("game", {});

  const {
    value: isResetModalOpen,
    setTrue: openResetModal,
    setFalse: closeResetModal,
  } = useBoolean(false);

  const playerScore =
    game && playerId ? scorePlayer(game, playerId).total : null;

  const handleSelectPlayer = (playerId: string | null) => {
    if (playerId) {
      dispatch(selectPlayer({ playerId }));
    }
  };
  const handleReset = () => {
    deleteGame();
    navigate("/new");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap={{ xs: "wrap", sm: "nowrap" }}
      columnGap={2}
    >
      <HeaderTitle sx={{ flexGrow: 1 }} />

      <IconButton size="sm" sx={{ order: { sm: 5 } }} onClick={openResetModal}>
        <ReplayIcon />
      </IconButton>

      <Box sx={{ display: { sm: "none" }, flexBasis: "100%", mb: 2 }} />

      {game && game.players.length > 1 ? (
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
      ) : (
        <Typography
          level="body-md"
          startDecorator={<PersonIcon sx={{ mr: "2px" }} />}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            flexBasis: { xs: "0", sm: "auto" },
            minWidth: "191px",
            my: "6px",
            ml: "9px",
          }}
        >
          {game?.players[0]?.name}
        </Typography>
      )}

      {playerScore != null && (
        <Typography level="title-lg" width="3ch" textAlign="right">
          <CountUp preserveValue duration={1} end={playerScore} />
        </Typography>
      )}
      <ConfirmResetModal
        open={isResetModalOpen}
        onConfirm={handleReset}
        onClose={closeResetModal}
      />
    </Stack>
  );
};

export default Header;
