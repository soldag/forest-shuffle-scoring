import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "GOSHAWK";
const POINTS_PER_BIRD = 3;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Bird],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 4,

  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.SilverFir,
      count: 2,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Bird]) * POINTS_PER_BIRD,
};

export default BLUEPRINT;
