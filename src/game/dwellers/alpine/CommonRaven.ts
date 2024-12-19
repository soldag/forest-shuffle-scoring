import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "COMMON_RAVEN";
const gameBox = GameBox.Alpine;
const points = 5;

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
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
