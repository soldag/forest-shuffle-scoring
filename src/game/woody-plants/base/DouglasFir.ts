import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "DOUGLAS_FIR";
const points = 5;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.DouglasFir,
  cost: 2,
  count: 7,
  isPartOfDeck: true,
  score: () => points,
};

export default blueprint;
