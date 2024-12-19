import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { Beech } from "../../woody-plants";

const name = "CHAFFINCH";
const gameBox = GameBox.Base;
const pointsOnBeech = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Bird],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
  ],
  score: ({ woodyPlant }) =>
    woodyPlant.name === Beech.name ? pointsOnBeech : 0,
};

export default blueprint;
