import { countCardNames } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import Squeaker from "./Squeaker";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "WILD_BOAR";
const POINTS = 10;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.ClovenhoofedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 5,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Sycamore,
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
    countCardNames(forest, [Squeaker.name]) > 0 ? POINTS : 0,
};

export default BLUEPRINT;
