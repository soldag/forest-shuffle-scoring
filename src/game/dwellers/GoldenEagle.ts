import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "GOLDEN_EAGLE";
const gameBox = GameBox.Alpine;
const pointsPerAmphibianOrPawedAnimal = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Alps, CardType.Bird],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Amphibian, CardType.PawedAnimal]) *
    pointsPerAmphibianOrPawedAnimal,
};

export default blueprint;
