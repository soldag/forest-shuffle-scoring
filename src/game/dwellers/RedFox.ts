import { countCardNames } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import EuropeanHare from "./EuropeanHare";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "RED_FOX";
const POINTS_PER_EUROPEAN_HARE = 2;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.PawedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 5,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 2,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardNames(forest, [EuropeanHare.name]) * POINTS_PER_EUROPEAN_HARE,
};

export default BLUEPRINT;
