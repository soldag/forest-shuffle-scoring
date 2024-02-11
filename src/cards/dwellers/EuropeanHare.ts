import { countCardNames } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "EUROPEAN_HARE";
const POINTS_PER_CARD = 1;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.PawedAnimal],
  modifiers: {
    ...DEFAULT_MODIFIERS,
    sharesSlotWith: Infinity,
  },
  cost: 0,
  count: 11,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
      count: 2,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
  ],
  score: ({ forest }) => countCardNames(forest, [NAME]) * POINTS_PER_CARD,
};

export default BLUEPRINT;
