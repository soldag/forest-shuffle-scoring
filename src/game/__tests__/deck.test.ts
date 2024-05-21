import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "@/game/dwellers";
import { createDeck } from "@/game/factory";
import * as Trees from "@/game/trees";
import { Expansion } from "@/game/types";

describe.each([
  [[], 66, 184],
  [[Expansion.Alpine], 80, 228],
])(
  "The card deck with expansions %s",
  (expansions, expectedTreeCount, expectedDwellerCount) => {
    const deck = createDeck(expansions);

    it("has the right amount of tree cards", () => {
      expect(deck.trees.length).toBe(expectedTreeCount);
    });

    it("has the right amount of dweller cards", () => {
      expect(deck.dwellers.length).toBe(expectedDwellerCount);
    });

    it("has only cards with distinct ids", () => {
      const cards = [...deck.trees, ...deck.dwellers];
      const distinctIds = new Set(cards.map((c) => c.id));

      expect(distinctIds.size).toBe(cards.length);
    });

    describe.each(Object.values(Trees))("has $name cards", (blueprint) => {
      const trees = deck.trees.filter((t) => t.name === blueprint.name);
      const isExpectedInDeck =
        blueprint.isPartOfDeck &&
        (!blueprint.expansion || expansions.includes(blueprint.expansion));

      it("in the correct total quantity", () => {
        expect(trees.length).toBe(isExpectedInDeck ? blueprint.count : 0);
      });
    });

    describe.each(Object.values(Dwellers))("has $name cards", (blueprint) => {
      const dwellers = deck.dwellers.filter((d) => d.name === blueprint.name);
      const isExpectedInDeck =
        blueprint.isPartOfDeck &&
        (!blueprint.expansion || expansions.includes(blueprint.expansion));

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
