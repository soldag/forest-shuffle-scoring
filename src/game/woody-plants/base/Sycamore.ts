import { countCardTypes } from "../../scoring/helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "SYCAMORE";
const count = 6;
const pointsPerTree = 1;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 2,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Sycamore,
      count,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Tree]) * pointsPerTree,
};

export default blueprint;
