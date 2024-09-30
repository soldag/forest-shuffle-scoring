import { describe, expect, it } from "@jest/globals";
import * as _ from "lodash-es";

import { WildStrawberries } from "@/game/dwellers";
import { CardType } from "@/game/types";
import * as WoodyPlants from "@/game/woody-plants";

import {
  createAnyDweller,
  createAnyWoodyPlant,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Wild Strawberries card", () => {
  const treeBlueprints = Object.values(WoodyPlants).filter((w) =>
    w.types.includes(CardType.Tree),
  );

  it("scores 10 points if forest has all tree species", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(WildStrawberries),
      otherWoodyPlants: treeBlueprints.map(createAnyWoodyPlant),
    });
    const game = createGame(forest);

    const points = WildStrawberries.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(10);
  });

  it.each(_.range(1, 7).map((x) => [x]))(
    "scores no points if forest has %i trees",
    (treeCount) => {
      const trees = treeBlueprints.slice(0, treeCount).map(createAnyWoodyPlant);
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(WildStrawberries),
        otherWoodyPlants: trees,
      });
      const game = createGame(forest);

      const points = WildStrawberries.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(0);
    },
  );
});
