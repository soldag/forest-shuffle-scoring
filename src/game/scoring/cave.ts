import { Forest } from "../types";

const pointsPerCard = 1;

export const scoreCave = (forest: Forest): number =>
  forest.caveCardCount * pointsPerCard;
