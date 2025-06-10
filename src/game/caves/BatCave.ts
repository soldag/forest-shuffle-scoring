import { countCards } from "@/game/scoring/helpers";
import { CardType, CaveBlueprint, GameBox } from "@/game/types";

const name = "BAT_CAVE";
const pointsPerCaveCard = 1;
const pointsPerBat = 3;

const blueprint: CaveBlueprint = {
  name,
  gameBox: GameBox.Exploration,
  count: 1,
  score: (forest) =>
    forest.cave.cardCount * pointsPerCaveCard +
    countCards(forest, { types: [CardType.Bat] }) * pointsPerBat,
};

export default blueprint;
