import * as _ from "lodash-es";
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
  const sortedScorings = _.orderBy(scoring.players, ["rank", "playerId"]);

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
        {sortedScorings.map(({ playerId, rank, total }) => (
          <tr key={playerId}>
            <td>{rank}</td>
            <td>{game.players.find((p) => p.id === playerId)?.name}</td>
            <td>{total}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScoringTable;
