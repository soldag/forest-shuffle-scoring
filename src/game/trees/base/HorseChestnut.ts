import { scoreSet } from "../../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "HORSE_CHESTNUT";
const pointsByCount = {
  1: 1,
  2: 4,
  3: 9,
  4: 16,
  5: 25,
  6: 36,
  7: 49,
};

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.HorseChestnut,
  cost: 2,
  count: 11,
  isPartOfDeck: true,
  score: ({ forest, tree }) => scoreSet(forest, tree, pointsByCount),
};

export default blueprint;
