import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "EUROPEAN_FAT_DORMOUSE";
const pointsWithBat = 15;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
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
  score: ({ woodyPlant, dweller }) => {
    const oppositeDwellers =
      dweller.position === DwellerPosition.Left
        ? woodyPlant?.dwellers[DwellerPosition.Right]
        : woodyPlant?.dwellers[DwellerPosition.Left];

    return oppositeDwellers?.some((c) => c.types.includes(CardType.Bat))
      ? pointsWithBat
      : 0;
  },
};

export default blueprint;
