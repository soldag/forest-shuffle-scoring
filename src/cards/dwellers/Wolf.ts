import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "WOLF";
const POINTS_PER_DEER = 5;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.PawedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 3,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SilverFir,
      count: 2,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Deer]) * POINTS_PER_DEER,
};

export default BLUEPRINT;
