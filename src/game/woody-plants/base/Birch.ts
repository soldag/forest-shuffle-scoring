import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "BIRCH";
const count = 10;
const points = 1;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 0,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Birch,
      count,
    },
  ],
  score: () => points,
};

export default blueprint;
