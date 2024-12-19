import { getDwellersOfWoodyPlant } from "@/game/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "EUROPEAN_POLECAT";
const gameBox = GameBox.WoodlandEdge;
const pointsIfAlone = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal, CardType.WoodlandEdge],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ woodyPlant }) =>
    getDwellersOfWoodyPlant(woodyPlant).length == 1 ? pointsIfAlone : 0,
};

export default blueprint;
