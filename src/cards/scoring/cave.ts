import { Forest } from "../types";

const POINTS_PER_CARD = 1;

export const scoreCave = (forest: Forest): number =>
  forest.cave.length * POINTS_PER_CARD;
