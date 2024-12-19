import { countCardNames } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import Squeaker from "./Squeaker";

const name = "FEMALE_WILD_BOAR";
const gameBox = GameBox.WoodlandEdge;
const pointsPerSqueaker = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
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
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardNames(forest, [Squeaker.name]) * pointsPerSqueaker,
};

export default blueprint;
