import { maxBy } from "lodash";
import React from "react";
import { FormattedMessage } from "react-intl";

import CelebrationIcon from "@mui/icons-material/Celebration";
import { Card, CardContent, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { Game, GameScoring } from "@/game";

interface WinnersCardProps {
  game: Game;
  scoring: GameScoring;
  sx?: SxProps;
}

const WinnersCard: React.FC<WinnersCardProps> = ({ game, scoring, sx }) => {
  const winnerId = maxBy(
    Object.entries(scoring.players),
    (x) => x[1].total,
  )?.[0];
  const score = winnerId ? scoring.players[winnerId].total : 0;
  const playerName = game.players.find((p) => p.id === winnerId)?.name;

  return (
    <Card variant="solid" color="primary" sx={sx}>
      <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <CelebrationIcon sx={{ fontSize: "50px" }} />
        <Typography level="body-lg" textColor="inherit">
          <FormattedMessage
            id="ScoringView.WinnersCard.text"
            defaultMessage="<b>{playerName}</b> wins the game with a total of {score}{nbsp}victory points."
            values={{
              playerName,
              score,
              nbsp: <>&nbsp;</>,
              b: (chunks) => <Typography fontWeight="lg">{chunks}</Typography>,
            }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WinnersCard;
