import {
  CardType,
  Expansion,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "ALPINE_LARCH";
const points = 3;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  expansion: Expansion.Alpine,
  types: [CardType.Alps, CardType.Tree],
  treeSymbol: TreeSymbol.AlpineLarch,
  cost: 1,
  count: 7,
  isPartOfDeck: true,
  score: () => points,
};

export default blueprint;
