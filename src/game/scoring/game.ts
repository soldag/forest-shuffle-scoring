import * as Dwellers from "../dwellers";
import * as Trees from "../trees";
import {
  DwellerPosition,
  DwellerScoringArgs,
  Forest,
  ForestScoring,
  Game,
  GameScoring,
  TreeCard,
  TreeScoringArgs,
} from "../types";
import { scoreCave } from "./cave";

const scoreDweller = (args: DwellerScoringArgs): number => {
  const blueprint = Object.values(Dwellers).find(
    (b) => b.name === args.dweller.name,
  );
  return blueprint?.score(args) ?? 0;
};

const scoreDwellersOfTree = (
  game: Game,
  forest: Forest,
  tree: TreeCard,
  position: DwellerPosition,
): number =>
  tree.dwellers[position]
    .map((dweller) =>
      scoreDweller({
        game,
        forest,
        tree,
        dweller,
      }),
    )
    .reduce((a, b) => a + b, 0);

const scoreDwellers = (
  game: Game,
  forest: Forest,
  position: DwellerPosition,
): number =>
  forest.trees
    .flatMap((tree) => scoreDwellersOfTree(game, forest, tree, position))
    .reduce((a, b) => a + b, 0);

const scoreTree = (args: TreeScoringArgs): number => {
  const blueprint = Object.values(Trees).find((b) => b.name === args.tree.name);
  return blueprint?.score(args) ?? 0;
};

const scoreTrees = (game: Game, forest: Forest): number =>
  forest.trees
    .map((tree) => scoreTree({ game, forest, tree }))
    .reduce((a, b) => a + b, 0);

export const scoreForest = (game: Game, forest: Forest): ForestScoring => ({
  trees: scoreTrees(game, forest),
  dwellerTop: scoreDwellers(game, forest, DwellerPosition.Top),
  dwellerBottom: scoreDwellers(game, forest, DwellerPosition.Bottom),
  dwellerLeft: scoreDwellers(game, forest, DwellerPosition.Left),
  dwellerRight: scoreDwellers(game, forest, DwellerPosition.Right),
  cave: scoreCave(forest),
});

export const scoreGame = (game: Game): GameScoring => ({
  forests: Object.fromEntries(
    Object.entries(game.forests).map(([playerId, forest]) => [
      playerId,
      scoreForest(game, forest),
    ]),
  ),
});
