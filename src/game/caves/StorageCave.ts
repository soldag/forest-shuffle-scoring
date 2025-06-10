import { CaveBlueprint, GameBox } from "@/game/types";

const name = "STORAGE_CAVE";
const pointsPerCard = 1;

const blueprint: CaveBlueprint = {
  name,
  gameBox: GameBox.Exploration,
  count: 1,
  score: ({ cave }) => cave.cardCount * pointsPerCard,
};

export default blueprint;
