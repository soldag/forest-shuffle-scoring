import { describe, expect, it } from "@jest/globals";
import * as _ from "lodash-es";

import { CardType } from "@/game/types";
import * as WoodyPlants from "@/game/woody-plants";
import { Oak } from "@/game/woody-plants";

import { createAnyWoodyPlant, createForestWith, createGame } from "../helpers";

describe("A Oak card", () => {
  const treeBlueprints = Object.values(WoodyPlants).filter((t) =>
    t.types.includes(CardType.Tree),
  );

  it("scores 10 points if forest has all tree species", () => {
    const woodyPlants = treeBlueprints.map(createAnyWoodyPlant);
    const oak = woodyPlants.find((w) => w.name === Oak.name)!;
    const forest = createForestWith({ woodyPlants });
    const game = createGame(forest);

    const points = Oak.score({ game, forest, woodyPlant: oak });

    expect(points).toBe(10);
  });

  it.each(_.range(1, 6).map((x) => [x]))(
    "scores no points if forest has %i other trees",
    (otherWoodyPlantCount) => {
      const otherWoodyPlants = treeBlueprints
        .slice(0, otherWoodyPlantCount)
        .map(createAnyWoodyPlant);
      const oak = createAnyWoodyPlant(Oak);
      const forest = createForestWith({
        woodyPlants: [oak, ...otherWoodyPlants],
      });
      const game = createGame(forest);

      const points = Oak.score({ game, forest, woodyPlant: oak });

      expect(points).toBe(0);
    },
  );
});
