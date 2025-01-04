import { countCardTypes } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "TROLL";
const pointsPerTree = 1;

// Promo card P011
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Tree]) * pointsPerTree,
};

export default blueprint;
