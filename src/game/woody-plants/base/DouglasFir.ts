import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "DOUGLAS_FIR";
const count = 7;
const points = 5;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 2,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.DouglasFir,
      count,
    },
  ],
  score: () => points,
};

export default blueprint;
