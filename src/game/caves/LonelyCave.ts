import { CaveBlueprint, GameBox } from "@/game/types";

const name = "LONELY_CAVE";
const pointsPerCard = 1;
const pointsIfEmpty = 5;

const blueprint: CaveBlueprint = {
  name,
  gameBox: GameBox.Exploration,
  count: 1,
  score: ({ cave }) =>
    cave.cardCount === 0 ? pointsIfEmpty : cave.cardCount * pointsPerCard,
};

export default blueprint;
