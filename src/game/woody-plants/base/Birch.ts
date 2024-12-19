import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "BIRCH";
const points = 1;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      treeSymbol: TreeSymbol.Birch,
      count: 10,
    },
  ],
  score: () => points,
};

export default blueprint;
