import { getDwellersOfTree } from "../helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const NAME = "SILVER_FIR";
const POINTS_PER_DWELLER = 2;

const BLUEPRINT: TreeCardBlueprint = {
  name: NAME,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.SilverFir,
  cost: 2,
  count: 6,
  isPartOfDeck: true,
  score: ({ tree }) => getDwellersOfTree(tree).length * POINTS_PER_DWELLER,
};

export default BLUEPRINT;
