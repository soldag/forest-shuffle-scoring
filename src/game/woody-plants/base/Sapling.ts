import { CardType, GameBox, WoodyPlantCardBlueprint } from "../../types";

const name = "SAPLING";
const points = 0;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 0,
  isPartOfDeck: false,
  variants: [{ gameBox: GameBox.Base, count: Infinity }],
  score: () => points,
};

export default blueprint;
