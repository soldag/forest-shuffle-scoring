import { countCardTypes } from "@/game/scoring/helpers";

import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../types";

const name = "CERRO";
const pointsPerClovenhoofedAnimal = 1;

// Promo card P014
const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.ClovenhoofedAnimal]) *
    pointsPerClovenhoofedAnimal,
};

export default blueprint;
