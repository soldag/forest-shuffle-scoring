import { FormattedList, FormattedMessage } from "react-intl";

import CelebrationIcon from "@mui/icons-material/Celebration";
import { Card, CardContent, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { Game, GameScoring } from "@/game";

interface WinnersCardProps {
  game: Game;
  scoring: GameScoring;
  sx?: SxProps;
}

const WinnersCard = ({ game, scoring, sx }: WinnersCardProps) => {
  const winnerScorings = scoring.players.filter((s) => s.rank === 1);
  const score = winnerScorings[0]?.total;
  const playerNames = winnerScorings.map(
    (s) => game.players.find((p) => p.id === s.playerId)?.name,
  );

  return (
    <Card variant="solid" color="primary" sx={sx}>
      <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <CelebrationIcon sx={{ fontSize: "50px" }} />
        <Typography level="body-lg" textColor="inherit">
          <FormattedMessage
            id="ScoringView.WinnersCard.text"
            defaultMessage="{playerNames} {playerCount, plural, =1 {wins} other {win}} the game with a total of {score, plural, =1 {#{nbsp}victory point} other {#{nbsp}victory points}}{playerCount, plural, =1 {} other { each}}."
            values={{
              score,
              playerCount: playerNames.length,
              playerNames: (
                <Typography fontWeight="lg">
                  <FormattedList value={playerNames} />
                </Typography>
              ),
              nbsp: <>&nbsp;</>,
            }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WinnersCard;
