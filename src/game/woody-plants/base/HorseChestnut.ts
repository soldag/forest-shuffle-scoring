import { scoreSet } from "../../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

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
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 11,
    },
  ],
  score: ({ forest, woodyPlant }) =>
    scoreSet(forest, woodyPlant, pointsByCount),
};

export default blueprint;
