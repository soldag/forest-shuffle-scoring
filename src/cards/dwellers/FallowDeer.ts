import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "FALLOW_DEER";
const POINTS_PER_CLOVENHOOFED_ANIMAL = 3;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.ClovenhoofedAnimal, CardType.Deer],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 2,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.ClovenhoofedAnimal]) *
    POINTS_PER_CLOVENHOOFED_ANIMAL,
};

export default BLUEPRINT;
