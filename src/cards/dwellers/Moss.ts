import { countTrees } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "MOSS";
const MIN_TREE_COUNT = 10;
const POINTS = 10;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
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
  score: ({ forest }) => (countTrees(forest) >= MIN_TREE_COUNT ? POINTS : 0),
};

export default BLUEPRINT;
