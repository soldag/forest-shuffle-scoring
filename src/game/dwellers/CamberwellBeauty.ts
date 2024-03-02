import { scoreButterflies } from "../scoring/butterflies";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "CAMBERWELL_BEAUTY";

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
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
  ],
  score: ({ forest, dweller }) => scoreButterflies(forest, dweller),
};

export default BLUEPRINT;
