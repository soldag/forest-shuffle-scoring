import { countCardTypes } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "SHEEP";
const pointsPerClovenhoofedAnimal = 3;

// Promo card P022
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.ClovenhoofedAnimal]) *
    pointsPerClovenhoofedAnimal,
};

export default blueprint;
