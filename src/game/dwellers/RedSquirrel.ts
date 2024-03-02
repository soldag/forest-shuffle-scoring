import Oak from "../trees/Oak";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "RED_SQUIRREL";
const POINTS = 5;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.PawedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ tree }) => (tree.name == Oak.name ? POINTS : 0),
};

export default BLUEPRINT;
