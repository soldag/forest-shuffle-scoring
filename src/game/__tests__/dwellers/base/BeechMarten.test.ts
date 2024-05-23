import { describe, expect, it } from "@jest/globals";

import { BeechMarten } from "@/game/dwellers";
import { createDweller } from "@/game/factory";
import { DwellerPosition } from "@/game/types";

import { createFakeDwellers, createFakeTree } from "../../fake";
import { addDwellersToTree, createForestWith, createGame } from "../../helpers";

describe("A Beech Marten card", () => {
  it.each([
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [5, 1, 1, 1],
    [5, 2, 2, 2],
  ])(
    "scores %i points with %i dwellers on top, %i on the bottom, %i on the left and 1 on the right",
    (expectedPoints, top, bottom, left) => {
      const variant = BeechMarten.variants.find(
        (v) => v.position === DwellerPosition.Right,
      )!;
      const dweller = createDweller(BeechMarten, variant);
      const tree = addDwellersToTree(
        createFakeTree(),
        ...createFakeDwellers(top, DwellerPosition.Top),
        ...createFakeDwellers(bottom, DwellerPosition.Bottom),
        ...createFakeDwellers(left, DwellerPosition.Left),
        dweller,
      );
      const forest = createForestWith({ trees: [tree] });
      const game = createGame(forest);

      const points = BeechMarten.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
