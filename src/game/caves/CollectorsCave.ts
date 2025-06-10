import { CaveBlueprint, GameBox } from "@/game/types";

const name = "COLLECTORS_CAVE";
const pointsPerCard = 2;

const blueprint: CaveBlueprint = {
  name,
  gameBox: GameBox.Exploration,
  count: 1,
  score: ({ cave }) => cave.cardCount * pointsPerCard,
};

export default blueprint;
