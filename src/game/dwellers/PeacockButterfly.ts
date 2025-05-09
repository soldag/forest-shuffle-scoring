import { scoreButterflies } from "../scoring/butterflies";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "PEACOCK_BUTTERFLY";
const gameBox = GameBox.Base;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Butterfly, CardType.Insect],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) => scoreButterflies(forest, dweller),
};

export default blueprint;
