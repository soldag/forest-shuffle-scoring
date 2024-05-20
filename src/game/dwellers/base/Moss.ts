import { countTrees } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "MOSS";
const minTreeCount = 10;
const points = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 2,
    },
  ],
  score: ({ forest }) => (countTrees(forest) >= minTreeCount ? points : 0),
};

export default blueprint;
