import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "EUROPEAN_WILDCAT";
const gameBox = GameBox.WoodlandEdge;
const pointsPerWoodlandEdgeCard = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal, CardType.WoodlandEdge],
  cost: 3,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.WoodlandEdge]) * pointsPerWoodlandEdgeCard,
};

export default blueprint;
