import { CardType, TreeCardBlueprint } from "../types";

const name = "SAPLING";
const points = 0;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 0,
  count: Infinity,
  isPartOfDeck: false,
  score: () => points,
};

export default blueprint;
