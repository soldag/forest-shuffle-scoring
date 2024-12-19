import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "ALPINE_LARCH";
const points = 3;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Alpine,
  types: [CardType.Alps, CardType.Tree],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 7,
    },
  ],
  score: () => points,
};

export default blueprint;
