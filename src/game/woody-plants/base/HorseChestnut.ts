import { scoreSet } from "../../scoring/helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

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

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.HorseChestnut,
  cost: 2,
  count: 11,
  isPartOfDeck: true,
  score: ({ forest, woodyPlant }) =>
    scoreSet(forest, woodyPlant, pointsByCount),
};

export default blueprint;
