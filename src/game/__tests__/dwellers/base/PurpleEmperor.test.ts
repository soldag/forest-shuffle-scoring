import { describe, expect, it } from "@jest/globals";

import {
  CamberwellBeauty,
  LargeTortoiseshell,
  PeacockButterfly,
  PurpleEmperor,
  SilverWashedFritillary,
} from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDweller } from "../../fake";
import {
  createAnyDweller,
  createDwellerSets,
  createForestWithDweller,
  createGame,
  generateCardIds,
} from "../../helpers";

describe("A Purple Emperor card", () => {
  it.each([
    [0, [1]],
    [3, [2]],
    [6, [3]],
    [12, [4]],
    [20, [5]],
    [3, [1, 2]],
    [9, [2, 3]],
    [18, [3, 4]],
    [32, [4, 5]],
    [40, [5, 5]],
    [21, [2, 3, 4]],
  ])(
    "scores %i points for a set of butterflies with lengths %p",
    (expectedPoints, lengths) => {
      const { dwellerUnderTest, otherDwellers } = createDwellerSets(
        PurpleEmperor,
        [
          CamberwellBeauty,
          LargeTortoiseshell,
          PeacockButterfly,
          SilverWashedFritillary,
        ],
        lengths,
      );
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest,
        otherDwellers,
      });
      const game = createGame(forest);

      const points = PurpleEmperor.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("scores 0 points if there's another butterfly with a smaller id", () => {
    const ids = generateCardIds(2).toSorted();
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: {
        ...createAnyDweller(PurpleEmperor),
        id: ids[1],
      },
      otherDwellers: [
        createFakeDweller(DwellerPosition.Top, {
          id: ids[0],
          types: [CardType.Butterfly],
        }),
      ],
    });
    const game = createGame(forest);

    const points = PurpleEmperor.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
