import { EuropeanHare } from "@/game/dwellers";
import { countCardNames } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "MOUNTAIN_HARE";
const gameBox = GameBox.Alpine;
const pointsPerCard = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Alps, CardType.PawedAnimal],
  cost: 0,
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
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SwissPine,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardNames(forest, [name, EuropeanHare.name]) * pointsPerCard,
};

export default blueprint;
