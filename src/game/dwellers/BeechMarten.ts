import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "BEECH_MARTEN";
const POINTS_PER_TREE = 5;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.PawedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 5,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 2,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest }) => {
    const fullyOccupiedTrees = forest.trees.filter((t) =>
      Object.values(t.dwellers).every((d) => d.length > 0),
    );

    return fullyOccupiedTrees.length * POINTS_PER_TREE;
  },
};

export default BLUEPRINT;
