import { orderBy } from "lodash";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Table, TableProps } from "@mui/joy";

import { Game, GameScoring } from "@/game";

interface ScoringTableProps extends TableProps {
  game: Game;
  scoring: GameScoring;
}

const ScoringTable: React.FC<ScoringTableProps> = ({
  game,
  scoring,
  ...otherProps
}) => {
  const rowData = orderBy(
    Object.entries(scoring.players).map(([playerId, playerScoring]) => ({
      playerId,
      playerName: game.players.find((p) => p.id === playerId)?.name,
      score: playerScoring.total,
    })),
    (x) => x.score,
    "desc",
  );

  return (
    <Table
      {...otherProps}
      stripe="even"
      sx={{
        ...otherProps.sx,
        "tableLayout": "auto",
        "& tr > *:nth-child(2)": { width: "100%" },
        "& tr > *:nth-child(3)": { textAlign: "right" },
        "--TableRow-stripeBackground": (theme) =>
          theme.vars.palette.primary[100],
      }}
    >
      <thead>
        <tr>
          <th>
            <FormattedMessage
              id="ScoringView.ScoringTable.headers.rank"
              defaultMessage="#"
            />
          </th>
          <th>
            <FormattedMessage
              id="ScoringView.ScoringTable.headers.player"
              defaultMessage="Player"
            />
          </th>
          <th>
            <FormattedMessage
              id="ScoringView.ScoringTable.headers.score"
              defaultMessage="Victory points"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {rowData.map(({ playerId, playerName, score }, i) => (
          <tr key={playerId}>
            <td>{i + 1}</td>
            <td>{playerName}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScoringTable;
