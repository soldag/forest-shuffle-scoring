import { countCardTypes } from "../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const NAME = "SYCAMORE";
const POINTS_PER_TREE = 1;

const BLUEPRINT: TreeCardBlueprint = {
  name: NAME,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Sycamore,
  cost: 2,
  count: 6,
  isPartOfDeck: true,
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Tree]) * POINTS_PER_TREE,
};

export default BLUEPRINT;
