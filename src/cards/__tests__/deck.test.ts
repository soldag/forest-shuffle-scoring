import { describe, expect, it } from "@jest/globals";

import { createDeck } from "@/cards/factory";

describe("The card deck", () => {
  const deck = createDeck();

  it("has the right amount of tree cards", () => {
    expect(deck.trees.length).toBe(66);
  });

  it("has the right amount of dweller cards", () => {
    expect(deck.dwellers.length).toBe(184);
  });
});
