import { scoreBats } from "../scoring/bats";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "BROWN_LONG_EARED_BAT";

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Bat],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
  ],
  score: ({ forest }) => scoreBats(forest),
};

export default BLUEPRINT;
