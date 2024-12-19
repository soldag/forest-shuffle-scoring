import { countCardTypes } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "FALLOW_DEER";
const gameBox = GameBox.Base;
const pointsPerClovenhoofedAnimal = 3;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal, CardType.Deer],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 2,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.ClovenhoofedAnimal]) *
    pointsPerClovenhoofedAnimal,
};

export default blueprint;
