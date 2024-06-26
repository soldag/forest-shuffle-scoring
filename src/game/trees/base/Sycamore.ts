import { countCardTypes } from "../../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "SYCAMORE";
const pointsPerTree = 1;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Sycamore,
  cost: 2,
  count: 6,
  isPartOfDeck: true,
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Tree]) * pointsPerTree,
};

export default blueprint;
