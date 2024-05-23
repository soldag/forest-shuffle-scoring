import { describe, expect, it } from "@jest/globals";

import { WoodAnt } from "@/game/dwellers";

import { DwellerPosition } from "../../..";
import { createFakeDweller, createFakeDwellers } from "../../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Wood Ant card", () => {
  it.each([
    [2, 0],
    [4, 1],
    [12, 5],
  ])(
    "scores %i points if there are %i other cards in any bottom slot",
    (expectedPoints, count) => {
      const { dweller, tree, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(WoodAnt),
        otherDwellers: [
          createFakeDweller(DwellerPosition.Top),
          createFakeDweller(DwellerPosition.Left),
          createFakeDweller(DwellerPosition.Right),
          ...createFakeDwellers(count, DwellerPosition.Bottom),
        ],
      });
      const game = createGame(forest);

      const points = WoodAnt.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
