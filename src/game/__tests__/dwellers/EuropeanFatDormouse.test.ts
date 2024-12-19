import { describe, expect, it } from "@jest/globals";

import { EuropeanFatDormouse } from "@/game/dwellers";
import { createDweller } from "@/game/factory";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDweller, createFakeWoodyPlant } from "../fake";
import {
  addDwellersToWoodyPlant,
  createForestWith,
  createGame,
} from "../helpers";

describe("A European Fat Dormouse card", () => {
  it.each([
    [0, DwellerPosition.Left, null],
    [0, DwellerPosition.Right, null],
    [0, DwellerPosition.Left, CardType.Amphibian],
    [0, DwellerPosition.Right, CardType.Amphibian],
    [15, DwellerPosition.Left, CardType.Bat],
    [15, DwellerPosition.Right, CardType.Bat],
  ])(
    "scores %i being in the %s slot with a %p card in the opposite slot",
    (expectedPoints, position, oppositeCardType) => {
      const variant = EuropeanFatDormouse.variants.find(
        (v) => v.position === position,
      );
      const dweller = createDweller(EuropeanFatDormouse, variant!);

      let dwellers = [dweller];
      if (oppositeCardType) {
        const oppositePosition =
          position === DwellerPosition.Left
            ? DwellerPosition.Right
            : DwellerPosition.Left;
        const oppositeDweller = createFakeDweller(oppositePosition, {
          types: [oppositeCardType],
        });
        dwellers = [...dwellers, oppositeDweller];
      }

      const woodyPlant = addDwellersToWoodyPlant(
        createFakeWoodyPlant(),
        ...dwellers,
      );
      const forest = createForestWith({ woodyPlants: [woodyPlant] });
      const game = createGame(forest);

      const points = EuropeanFatDormouse.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
