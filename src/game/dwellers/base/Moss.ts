import { countCards } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "MOSS";
const gameBox = GameBox.Base;
const minTreeCount = 10;
const points = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 2,
    },
  ],
  score: ({ forest }) =>
    countCards(forest, { types: [CardType.Tree] }) >= minTreeCount ? points : 0,
};

export default blueprint;
