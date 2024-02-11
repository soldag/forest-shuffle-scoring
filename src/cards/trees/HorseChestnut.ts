import { scoreSet } from "../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const NAME = "HORSE_CHESTNUT";
const POINTS_BY_COUNT = {
  1: 1,
  2: 4,
  3: 9,
  4: 16,
  5: 25,
  6: 36,
};

const BLUEPRINT: TreeCardBlueprint = {
  name: NAME,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.HorseChestnut,
  cost: 2,
  count: 11,
  isPartOfDeck: true,
  score: ({ forest, tree }) => scoreSet(forest, tree, POINTS_BY_COUNT),
};

export default BLUEPRINT;
