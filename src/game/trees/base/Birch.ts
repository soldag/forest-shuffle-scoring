import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "BIRCH";
const points = 1;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Birch,
  cost: 0,
  count: 10,
  isPartOfDeck: true,
  score: () => points,
};

export default blueprint;
