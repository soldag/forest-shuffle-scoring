import { CaveBlueprint, GameBox } from "@/game/types";

const name = "REGULAR_CAVE";
const pointsPerCard = 1;

const blueprint: CaveBlueprint = {
  name,
  gameBox: GameBox.Base,
  count: 5,
  score: ({ cave }) => cave.cardCount * pointsPerCard,
};

export default blueprint;
