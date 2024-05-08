import * as _ from "lodash-es";
import React from "react";
import { IntlShape, defineMessages, useIntl } from "react-intl";

import { Table, TableProps, Typography } from "@mui/joy";

import { Game, GameScoring, PlayerScoringWithRank } from "@/game";

const headerMessages = defineMessages({
  trees: {
    id: "ScoringView.DetailedScoringTable.headers.trees",
    defaultMessage: "Trees",
  },
  dweller: {
    id: "ScoringView.DetailedScoringTable.headers.dwellers",
    defaultMessage: "Dwellers",
  },
  dwellerTop: {
    id: "ScoringView.DetailedScoringTable.headers.dwellers.top",
    defaultMessage: "Top",
  },
  dwellerBottom: {
    id: "ScoringView.DetailedScoringTable.headers.dwellers.bottom",
    defaultMessage: "Bottom",
  },
  dwellerLeft: {
    id: "ScoringView.DetailedScoringTable.headers.dwellers.left",
    defaultMessage: "Left",
  },
  dwellerRight: {
    id: "ScoringView.DetailedScoringTable.headers.dwellers.right",
    defaultMessage: "Right",
  },
  cave: {
    id: "ScoringView.DetailedScoringTable.headers.cave",
    defaultMessage: "Cave",
  },
  total: {
    id: "ScoringView.DetailedScoringTable.headers.total",
    defaultMessage: "Total",
  },
});

const renderRow = (
  intl: IntlShape,
  scorings: PlayerScoringWithRank[],
  key: keyof typeof headerMessages & keyof PlayerScoringWithRank,
  options?: { nested?: boolean; footer?: boolean },
) => {
  const Cell = options?.footer ? "th" : "td";

  return (
    <tr key={key}>
      <th scope="row">
        <Typography
          sx={{
            ml: options?.nested ? "1em" : 0,
          }}
        >
          {intl.formatMessage(headerMessages[key])}
        </Typography>
      </th>
      {scorings.map((scoring) => (
        <Cell key={scoring.playerId}>{scoring[key]}</Cell>
      ))}
    </tr>
  );
};

interface ScoringTableProps extends TableProps {
  game: Game;
  scoring: GameScoring;
}

const DetailsScoringTable: React.FC<ScoringTableProps> = ({
  game,
  scoring,
  ...otherProps
}) => {
  const intl = useIntl();

  const playerCount = game.players.length;
  const sortedScorings = _.orderBy(scoring.players, ["rank", "playerId"]);

  return (
    <Table
      {...otherProps}
      sx={{
        ...otherProps.sx,
        "tableLayout": "auto",
        "& tr > td, th:not(:first-of-type)": {
          width: `${(1 / playerCount) * 100}%`,
          textAlign: "right",
        },
      }}
    >
      <thead>
        <tr>
          <th />
          {sortedScorings.map(({ playerId }) => (
            <th key={playerId}>
              {game.players.find((p) => p.id === playerId)?.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderRow(intl, sortedScorings, "trees")}
        <tr>
          <th scope="row" colSpan={playerCount + 1}>
            {intl.formatMessage(headerMessages.dweller)}
          </th>
        </tr>
        {renderRow(intl, sortedScorings, "dwellerTop", { nested: true })}
        {renderRow(intl, sortedScorings, "dwellerBottom", { nested: true })}
        {renderRow(intl, sortedScorings, "dwellerLeft", { nested: true })}
        {renderRow(intl, sortedScorings, "dwellerRight", { nested: true })}
        {renderRow(intl, sortedScorings, "cave")}
      </tbody>
      <tfoot>
        {renderRow(intl, sortedScorings, "total", { footer: true })}
      </tfoot>
    </Table>
  );
};

export default DetailsScoringTable;
