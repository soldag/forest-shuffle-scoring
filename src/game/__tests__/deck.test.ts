import { describe, expect, it } from "@jest/globals";

import { EXPANSION_CARD_TYPES } from "@/game/constants";
import * as Dwellers from "@/game/dwellers";
import { createDeck } from "@/game/factory";
import {
  CardType,
  DwellerCard,
  DwellerVariant,
  GameBox,
  WoodyPlantCard,
  WoodyPlantVariant,
} from "@/game/types";
import * as WoodyPlants from "@/game/woody-plants";

const gameBoxCardTypes = {
  [GameBox.Base]: null,
  [GameBox.PromoCards]: null,
  [GameBox.Alpine]: CardType.Alps,
  [GameBox.WoodlandEdge]: CardType.WoodlandEdge,
};

describe("A full card deck", () => {
  const deck = createDeck(Object.values(GameBox));
  const cards = [...deck.dwellers, ...deck.woodyPlants];

  it("has only cards with distinct ids", () => {
    const distinctIds = new Set(cards.map((c) => c.id));
    expect(distinctIds.size).toBe(cards.length);
  });

  describe.each(cards)("has $name card", (card) => {
    if (card.gameBox === GameBox.Base) {
      it("without any expansion card type", () => {
        EXPANSION_CARD_TYPES.forEach((cardType) =>
          expect(card.types).not.toContain(cardType),
        );
      });
    }

    const expectedCardType = gameBoxCardTypes[card.gameBox];
    if (expectedCardType) {
      it("with correct expansion card type", () => {
        expect(card.types).toContain(expectedCardType);
      });
    }
  });
});

describe.each([
  [[GameBox.Base], 66, 184],
  [[GameBox.Base, GameBox.Alpine], 80, 228],
  [[GameBox.Base, GameBox.WoodlandEdge], 78, 232],
  [[GameBox.Base, GameBox.PromoCards], 68, 200],
  [Object.values(GameBox), 94, 292],
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

    describe.each(Object.values(WoodyPlants))(
      "has $name cards",
      (blueprint) => {
        const woodyPlants = deck.woodyPlants.filter(
          (wp) => wp.name === blueprint.name,
        );

        const isVariant = (
          woodyPlant: WoodyPlantCard,
          variant: WoodyPlantVariant,
        ) =>
          woodyPlant.gameBox === variant.gameBox &&
          woodyPlant.treeSymbol === variant.treeSymbol;

        it("that match defined variants", () => {
          expect(
            woodyPlants.every((wp) =>
              blueprint.variants.some((v) => isVariant(wp, v)),
            ),
          ).toBe(true);
        });

        it.each(blueprint.variants)(
          "of variant ($gameBox, $treeSymbol) in the correct quantity",
          (variant) => {
            const woodyPlantsOfVariant = woodyPlants.filter((wp) =>
              isVariant(wp, variant),
            );
            const isExpectedInDeck =
              blueprint.isPartOfDeck && gameBoxes.includes(variant.gameBox);

            expect(woodyPlantsOfVariant.length).toBe(
              isExpectedInDeck ? variant.count : 0,
            );
          },
        );
      },
    );

    describe.each(Object.values(Dwellers))("has $name cards", (blueprint) => {
      const dwellers = deck.dwellers.filter((d) => d.name === blueprint.name);

      const isVariant = (dweller: DwellerCard, variant: DwellerVariant) =>
        dweller.gameBox === variant.gameBox &&
        dweller.position === variant.position &&
        dweller.treeSymbol === variant.treeSymbol;

      it("that match defined variants", () => {
        expect(
          dwellers.every((d) =>
            blueprint.variants.some((v) => isVariant(d, v)),
          ),
        ).toBe(true);
      });

      it.each(blueprint.variants)(
        "of variant ($gameBox, $position, $treeSymbol) in the correct quantity",
        (variant) => {
          const dwellersOfVariant = dwellers.filter((d) =>
            isVariant(d, variant),
          );
          const isExpectedInDeck =
            blueprint.isPartOfDeck && gameBoxes.includes(variant.gameBox);

          expect(dwellersOfVariant.length).toBe(
            isExpectedInDeck ? variant.count : 0,
          );
        },
      );
    });
  },
);
