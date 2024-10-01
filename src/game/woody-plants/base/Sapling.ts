import { CardType, GameBox, WoodyPlantCardBlueprint } from "../../types";

const name = "SAPLING";
const count = Infinity;
const points = 0;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 0,
  count,
  isPartOfDeck: false,
  variants: [{ count }],
  score: () => points,
};

export default blueprint;
