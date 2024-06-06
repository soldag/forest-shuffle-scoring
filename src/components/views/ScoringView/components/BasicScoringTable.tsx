import * as _ from "lodash-es";
import { FormattedMessage } from "react-intl";

import { Table, TableProps } from "@mui/joy";

import { Game, GameScoring } from "@/game";

interface ScoringTableProps extends TableProps {
  game: Game;
  scoring: GameScoring;
}

const BasicScoringTable = ({
  game,
  scoring,
  ...otherProps
}: ScoringTableProps) => {
  const sortedScorings = _.orderBy(scoring.players, ["rank", "playerId"]);

  return (
    <Table
      {...otherProps}
      sx={{
        ...otherProps.sx,
        "tableLayout": "auto",
        "& tr > *:nth-of-type(2)": { width: "100%" },
        "& tr > *:nth-of-type(3)": { textAlign: "right" },
      }}
    >
      <thead>
        <tr>
          <th>
            <FormattedMessage
              id="ScoringView.BasicScoringTable.headers.rank"
              defaultMessage="#"
            />
          </th>
          <th>
            <FormattedMessage
              id="ScoringView.BasicScoringTable.headers.player"
              defaultMessage="Player"
            />
          </th>
          <th>
            <FormattedMessage
              id="ScoringView.BasicScoringTable.headers.score"
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

export default BasicScoringTable;
