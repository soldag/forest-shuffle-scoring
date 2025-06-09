import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "GNAT";
const pointsPerBat = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Insect],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    // Promo card P005
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest }) => countCardTypes(forest, [CardType.Bat]) * pointsPerBat,
};

export default blueprint;
