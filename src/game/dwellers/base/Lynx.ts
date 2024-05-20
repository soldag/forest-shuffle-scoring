import { countCardNames } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";
import RoeDeer from "./RoeDeer";

const name = "LYNX";
const pointsWithRoeDeer = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 6,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 2,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
  score: ({ forest }) => {
    const deerCount = countCardNames(forest, [RoeDeer.name]);
    return deerCount > 0 ? pointsWithRoeDeer : 0;
  },
};

export default blueprint;
