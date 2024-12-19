import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "STAG_BEETLE";
const gameBox = GameBox.Base;
const pointsPerPawedAnimal = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Insect],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.PawedAnimal]) * pointsPerPawedAnimal,
};

export default blueprint;
