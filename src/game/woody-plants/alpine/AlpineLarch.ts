import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "ALPINE_LARCH";
const count = 7;
const points = 3;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Alpine,
  types: [CardType.Alps, CardType.Tree],
  cost: 1,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.AlpineLarch,
      count,
    },
  ],
  score: () => points,
};

export default blueprint;
