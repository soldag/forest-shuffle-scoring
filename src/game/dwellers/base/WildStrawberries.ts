import { countTreeSpecies } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "WILD_STRAWBERRIES";
const gameBox = GameBox.Base;
const points = 10;
const minTreeSpeciesCount = 8;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
  ],
  score: ({ forest }) =>
    countTreeSpecies(forest) < minTreeSpeciesCount ? 0 : points,
};

export default blueprint;
