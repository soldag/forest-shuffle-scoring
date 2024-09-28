import { countCardTypes } from "../../scoring/helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "SYCAMORE";
const pointsPerTree = 1;

const blueprint: WoodyPlantCardBlueprint = {
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
