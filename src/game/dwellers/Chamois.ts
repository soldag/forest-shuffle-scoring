import { countTreeSymbols } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "CHAMOIS";
const gameBox = GameBox.Alpine;
const pointsPerTreeSymbol = 3;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Alps, CardType.ClovenhoofedAnimal],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SwissPine,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) =>
    dweller.treeSymbol
      ? countTreeSymbols(forest, [dweller.treeSymbol]) * pointsPerTreeSymbol
      : 0,
};

export default blueprint;
