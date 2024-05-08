import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const name = "WOOD_ANT";
const pointsPerBottomCard = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Insect],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 2,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    forest.trees.flatMap((t) => t.dwellers[DwellerPosition.Bottom]).length *
    pointsPerBottomCard,
};

export default blueprint;
