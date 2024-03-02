import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "EUROPEAN_FAT_DORMOUSE";
const POINTS_WITH_BAT = 15;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
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
  score: ({ tree, dweller }) => {
    const oppositeDwellers =
      dweller.position === DwellerPosition.Left
        ? tree?.dwellers[DwellerPosition.Right]
        : tree?.dwellers[DwellerPosition.Left];

    return oppositeDwellers?.some((c) => c.types.includes(CardType.Bat))
      ? POINTS_WITH_BAT
      : 0;
  },
};

export default BLUEPRINT;
