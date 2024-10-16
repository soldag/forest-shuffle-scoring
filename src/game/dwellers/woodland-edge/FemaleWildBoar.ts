import { countCardNames } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";
import Squeaker from "./Squeaker";

const name = "FEMALE_WILD_BOAR";
const pointsPerSqueaker = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardNames(forest, [Squeaker.name]) * pointsPerSqueaker,
};

export default blueprint;
