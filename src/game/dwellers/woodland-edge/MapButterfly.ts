import { scoreButterflies } from "../../scoring/butterflies";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "MAP_BUTTERFLY";

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.Butterfly, CardType.Insect, CardType.WoodlandEdge],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) => scoreButterflies(forest, dweller),
};

export default blueprint;
