import { FormattedMessage, IntlShape, useIntl } from "react-intl";

import { Button, ButtonProps } from "@mui/joy";

import bgStatsIcon from "@/assets/images/bgStatsIcon.png";
import { Game, GameScoring } from "@/game";
import CommonMessages from "@/translations/messages/Common";

const SOURCE_GAME_ID = 1;
const BGG_GAME_ID = 391163;

const getTimestampUtc = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const getUrl = (intl: IntlShape, game: Game, scoring: GameScoring) => {
  const data = {
    sourcePlayId: game.id,
    sourceName: intl.formatMessage(CommonMessages.appName),
    playDate: getTimestampUtc(),
    game: {
      sourceGameId: SOURCE_GAME_ID,
      bggId: BGG_GAME_ID,
      name: intl.formatMessage(CommonMessages.gameName),
      highestWins: true,
      noPoints: false,
    },
    players: scoring.players.map((s) => ({
      sourcePlayerId: s.playerId,
      name: game.players.find((p) => p.id === s.playerId)?.name,
      startPlayer: false,
      score: s.total,
      winner: s.rank === 1,
    })),
  };

  const url = new URL("https://app.bgstatsapp.com/createPlay.html");
  url.searchParams.append("data", JSON.stringify(data));
  return url.href;
};

interface BGStatsButtonProps extends ButtonProps {
  game: Game;
  scoring: GameScoring;
}

const BGStatsButton: React.FC<BGStatsButtonProps> = ({
  game,
  scoring,
  ...otherProps
}) => {
  const intl = useIntl();

  return (
    <a
      href={getUrl(intl, game, scoring)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        {...otherProps}
        variant="soft"
        color="neutral"
        startDecorator={
          <img src={bgStatsIcon} style={{ width: "24px", height: "24px" }} />
        }
      >
        <FormattedMessage
          id="ScoringView.BGStatsButton.label"
          defaultMessage="Post to BG Stats"
        />
      </Button>
    </a>
  );
};

export default BGStatsButton;
