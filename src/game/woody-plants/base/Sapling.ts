import { CardType, WoodyPlantCardBlueprint } from "../../types";

const name = "SAPLING";
const count = Infinity;
const points = 0;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 0,
  count,
  isPartOfDeck: false,
  variants: [{ count }],
  score: () => points,
};

export default blueprint;
