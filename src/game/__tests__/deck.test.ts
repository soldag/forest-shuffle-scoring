import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "@/game/dwellers";
import { createDeck } from "@/game/factory";
import { GameBox } from "@/game/types";
import * as WoodyPlants from "@/game/woody-plants";

describe.each([
  [[GameBox.Base], 66, 184],
  [[GameBox.Base, GameBox.Alpine], 80, 228],
  [[GameBox.Base, GameBox.WoodlandEdge], 78, 232],
  [[GameBox.Base, GameBox.Alpine, GameBox.WoodlandEdge], 92, 276],
])(
  "The card deck with boxes %s",
  (gameBoxes, expectedWoodyPlantCount, expectedDwellerCount) => {
    const deck = createDeck(gameBoxes);

    it("has the right amount of woody plant cards", () => {
      expect(deck.woodyPlants.length).toBe(expectedWoodyPlantCount);
    });

    it("has the right amount of dweller cards", () => {
      expect(deck.dwellers.length).toBe(expectedDwellerCount);
    });

    it("has only cards with distinct ids", () => {
      const cards = [...deck.woodyPlants, ...deck.dwellers];
      const distinctIds = new Set(cards.map((c) => c.id));

      expect(distinctIds.size).toBe(cards.length);
    });

    describe.each(Object.values(WoodyPlants))(
      "has $name cards",
      (blueprint) => {
        const woodyPlants = deck.woodyPlants.filter(
          (wp) =>
            wp.name === blueprint.name && wp.gameBox === blueprint.gameBox,
        );
        const isExpectedInDeck =
          blueprint.isPartOfDeck && gameBoxes.includes(blueprint.gameBox);

        it("in the correct total quantity", () => {
          expect(woodyPlants.length).toBe(
            isExpectedInDeck ? blueprint.count : 0,
          );
        });

        it.each(blueprint.variants)(
          "of variant ($treeSymbol) in the correct quantity",
          (variant) => {
            const woodyPlantsOfVariant = woodyPlants.filter(
              (wp) => wp.treeSymbol === variant.treeSymbol,
            );

            expect(woodyPlantsOfVariant.length).toBe(
              isExpectedInDeck ? variant.count : 0,
            );
          },
        );
      },
    );

    describe.each(Object.values(Dwellers))("has $name cards", (blueprint) => {
      const dwellers = deck.dwellers.filter(
        (d) => d.name === blueprint.name && d.gameBox === blueprint.gameBox,
      );
      const isExpectedInDeck =
        blueprint.isPartOfDeck && gameBoxes.includes(blueprint.gameBox);

      it("in the correct total quantity", () => {
        expect(dwellers.length).toBe(isExpectedInDeck ? blueprint.count : 0);
      });

      it.each(blueprint.variants)(
        "of variant ($position, $treeSymbol) in the correct quantity",
        (variant) => {
          const dwellersOfVariant = dwellers.filter(
            (d) =>
              d.position === variant.position &&
              d.treeSymbol === variant.treeSymbol,
          );

          expect(dwellersOfVariant.length).toBe(
            isExpectedInDeck ? variant.count : 0,
          );
        },
      );
    });
  },
);
