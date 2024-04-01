import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "@/game/dwellers";
import { createDeck } from "@/game/factory";
import * as Trees from "@/game/trees";

describe("The card deck", () => {
  const deck = createDeck();

  it("has the right amount of tree cards", () => {
    expect(deck.trees.length).toBe(66);
  });

  it("has the right amount of dweller cards", () => {
    expect(deck.dwellers.length).toBe(184);
  });

  it("has only cards with distinct ids", () => {
    const cards = [...deck.trees, ...deck.dwellers];
    const distinctIds = new Set(cards.map((c) => c.id));

    expect(distinctIds.size).toBe(cards.length);
  });

  describe.each(Object.values(Trees))("has $name cards", (blueprint) => {
    const trees = deck.trees.filter((t) => t.name === blueprint.name);

    it("in the correct total quantity", () => {
      const expectedCount = blueprint.isPartOfDeck ? blueprint.count : 0;
      expect(trees.length).toBe(expectedCount);
    });
  });

  describe.each(Object.values(Dwellers))("has $name cards", (blueprint) => {
    const dwellers = deck.dwellers.filter((d) => d.name === blueprint.name);

    it("in the correct total quantity", () => {
      const expectedCount = blueprint.isPartOfDeck ? blueprint.count : 0;
      expect(dwellers.length).toBe(expectedCount);
    });

    it.each(blueprint.variants)(
      "of variant ($position, $treeSymbol) in the correct quantity",
      (variant) => {
        const dwellersOfVariant = dwellers.filter(
          (d) =>
            d.position === variant.position &&
            d.treeSymbol === variant.treeSymbol,
        );

        expect(dwellersOfVariant.length).toBe(variant.count);
      },
    );
  });
});
