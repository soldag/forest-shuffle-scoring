import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "COMMON_TOAD";
const pointsIfPaired = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Amphibian],
  modifiers: {
    ...DEFAULT_MODIFIERS,
    sharesSlotWith: 1,
  },
  cost: 0,
  count: 6,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ woodyPlant }) => {
    const bottomDwellers = woodyPlant.dwellers[DwellerPosition.Bottom];
    return bottomDwellers.filter((c) => c.name === name).length > 1
      ? pointsIfPaired
      : 0;
  },
};

export default blueprint;
