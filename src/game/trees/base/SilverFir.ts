import { getDwellersOfTree } from "../../helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "SILVER_FIR";
const pointsPerDweller = 2;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.SilverFir,
  cost: 2,
  count: 6,
  isPartOfDeck: true,
  score: ({ tree }) => getDwellersOfTree(tree).length * pointsPerDweller,
};

export default blueprint;
