import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "BIRCH";
const points = 1;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Birch,
  cost: 0,
  count: 10,
  isPartOfDeck: true,
  score: () => points,
};

export default blueprint;
