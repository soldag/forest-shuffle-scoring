import { scoreButterflies } from "../scoring/butterflies";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "LARGE_TORTOISESHELL";

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Butterfly, CardType.Insect],
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
      treeSymbol: TreeSymbol.SilverFir,
      count: 2,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) => scoreButterflies(forest, dweller),
};

export default BLUEPRINT;
