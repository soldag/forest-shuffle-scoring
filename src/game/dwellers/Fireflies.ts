import { scoreSet } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "FIREFLIES";
const POINTS_BY_COUNT = {
  2: 10,
  3: 15,
  4: 20,
};

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Insect],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) => scoreSet(forest, dweller, POINTS_BY_COUNT),
};

export default BLUEPRINT;
