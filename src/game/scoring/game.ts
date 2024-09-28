import * as _ from "lodash-es";

import { filterTrees } from "@/game/helpers";

import * as Dwellers from "../dwellers";
import {
  DwellerPosition,
  DwellerScoringArgs,
  Forest,
  Game,
  GameScoring,
  PlayerScoring,
  WoodyPlantCard,
  WoodyPlantScoringArgs,
} from "../types";
import * as WoodyPlants from "../woody-plants";
import { scoreCave } from "./cave";

const scoreDweller = (args: DwellerScoringArgs): number => {
  const blueprint = Object.values(Dwellers).find(
    (b) => b.name === args.dweller.name,
  );
  return blueprint?.score(args) ?? 0;
};

const scoreDwellersOfWoodyPlant = (
  game: Game,
  forest: Forest,
  woodyPlant: WoodyPlantCard,
  position: DwellerPosition,
): number =>
  woodyPlant.dwellers[position]
    .map((dweller) =>
      scoreDweller({
        game,
        forest,
        woodyPlant,
        dweller,
      }),
    )
    .reduce((a, b) => a + b, 0);

const scoreDwellers = (
  game: Game,
  forest: Forest,
  position: DwellerPosition,
): number =>
  forest.woodyPlants
    .flatMap((woodyPlant) =>
      scoreDwellersOfWoodyPlant(game, forest, woodyPlant, position),
    )
    .reduce((a, b) => a + b, 0);

const scoreTree = (args: WoodyPlantScoringArgs): number => {
  const blueprint = Object.values(WoodyPlants).find(
    (b) => b.name === args.woodyPlant.name,
  );
  return blueprint?.score(args) ?? 0;
};

const scoreTrees = (game: Game, forest: Forest): number =>
  filterTrees(forest.woodyPlants)
    .map((woodyPlant) => scoreTree({ game, forest, woodyPlant }))
    .reduce((a, b) => a + b, 0);

export const scorePlayer = (game: Game, playerId: string): PlayerScoring => {
  const forest = game.players.find((p) => p.id === playerId)?.forest;
  if (!forest) {
    throw new Error("A player with this ID does not exist");
  }

  const pointsPerCategory = {
    trees: scoreTrees(game, forest),
    dwellerTop: scoreDwellers(game, forest, DwellerPosition.Top),
    dwellerBottom: scoreDwellers(game, forest, DwellerPosition.Bottom),
    dwellerLeft: scoreDwellers(game, forest, DwellerPosition.Left),
    dwellerRight: scoreDwellers(game, forest, DwellerPosition.Right),
    cave: scoreCave(forest),
  };

  return {
    playerId,
    ...pointsPerCategory,
    total: Object.values(pointsPerCategory).reduce((a, b) => a + b, 0),
  };
};

export const scoreGame = (game: Game): GameScoring => {
  const playerScorings = game.players.map(({ id }) => scorePlayer(game, id));
  const playerScoringsWithRank = _.orderBy(
    playerScorings.map((scoring) => ({
      ...scoring,
      rank: playerScorings.filter((s) => s.total > scoring.total).length + 1,
    })),
    (s) => s.rank,
  );

  return {
    players: playerScoringsWithRank,
  };
};
