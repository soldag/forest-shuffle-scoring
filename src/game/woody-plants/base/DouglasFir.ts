import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "DOUGLAS_FIR";
const points = 5;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.DouglasFir,
      count: 7,
    },
  ],
  score: () => points,
};

export default blueprint;
