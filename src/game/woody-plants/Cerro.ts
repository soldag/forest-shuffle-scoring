import { extendBlueprint } from "../blueprints";
import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../types";
import Oak from "./Oak";

const name = "CERRO";
const pointsPerClovenhoofedAnimal = 1;

// Promo card P014
const blueprint: WoodyPlantCardBlueprint = extendBlueprint(Oak, {
  name,
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
});

export default blueprint;
