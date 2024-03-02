import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "WOOD_ANT";
const POINTS_PER_BOTTOM_CARD = 2;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Insect],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 2,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    forest.trees.flatMap((t) => t.dwellers[DwellerPosition.Bottom]).length *
    POINTS_PER_BOTTOM_CARD,
};

export default BLUEPRINT;
