import { useContext } from "react";
import CountUp from "react-countup";
import { useIntl } from "react-intl";
import { useBoolean } from "usehooks-ts";
import { useLocation } from "wouter";

import PersonIcon from "@mui/icons-material/Person";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton, Stack, Typography } from "@mui/joy";

import { selectPlayer } from "@/actions/game";
import appIcon from "@/assets/images/appIcon.svg";
import ConfirmResetModal from "@/components/common/ConfirmResetModal";
import LanguageSelect from "@/components/common/LocaleSelect";
import PlayerSelect from "@/components/common/PlayerSelect";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import GameContext from "@/components/contexts/GameContext";
import LocaleContext from "@/components/contexts/LocaleContext";
import { scorePlayer } from "@/game";
import CommonMessages from "@/translations/messages/Common";

interface HeaderProps {
  showLanguageSelect?: boolean;
  showThemeButton?: boolean;
  showResetButton?: boolean;
  showPlayerDetails?: boolean;
}

const Header = ({
  showLanguageSelect = false,
  showThemeButton = false,
  showResetButton = false,
  showPlayerDetails = false,
}: HeaderProps) => {
  const intl = useIntl();
  const [, navigate] = useLocation();

  const { locale, setLocale } = useContext(LocaleContext);
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
      dispatch(selectPlayer({ playerId }));
    }
  };
  const handleReset = () => {
    navigate("/new");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap={showPlayerDetails ? { xs: "wrap", sm: "nowrap" } : "nowrap"}
      columnGap={1}
    >
      <Stack direction="row" alignItems="center" gap={1.5} sx={{ flexGrow: 1 }}>
        <img src={appIcon} style={{ height: "32px", width: "32px" }} />
        <Typography level="title-lg">
          {intl.formatMessage(CommonMessages.appName)}
        </Typography>
      </Stack>

      {showThemeButton && <ThemeToggleButton />}

      {showLanguageSelect && (
        <LanguageSelect
          variant="plain"
          value={locale}
          onChange={(_, value) => setLocale(value!)}
          slotProps={{
            listbox: { placement: "bottom-start" },
          }}
          sx={{ flexShrink: 0 }}
        />
      )}

      {showResetButton && (
        <>
          <IconButton
            size="sm"
            sx={{ order: { sm: 5 } }}
            onClick={openResetModal}
          >
            <ReplayIcon />
          </IconButton>

          <ConfirmResetModal
            open={isResetModalOpen}
            onConfirm={handleReset}
            onClose={closeResetModal}
          />
        </>
      )}

      {showPlayerDetails && game && (
        <>
          <Box sx={{ display: { sm: "none" }, flexBasis: "100%", mb: 2 }} />

          {game.players.length > 1 ? (
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
            <Typography
              component="div"
              level="title-lg"
              width="3ch"
              textAlign="right"
            >
              <CountUp preserveValue duration={1} end={playerScore} />
            </Typography>
          )}
        </>
      )}
    </Stack>
  );
};

export default Header;
