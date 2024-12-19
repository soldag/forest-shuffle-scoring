import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "../../dwellers";
import { CardType, DwellerPosition } from "../../types";
import * as WoodyPlants from "../../woody-plants";

const genericCardTypes = [CardType.Alps, CardType.WoodlandEdge];

const allowedTypeCombinations = [
  new Set([CardType.Amphibian]),
  new Set([CardType.Bat]),
  new Set([CardType.Bird]),
  new Set([CardType.ClovenhoofedAnimal]),
  new Set([CardType.Insect]),
  new Set([CardType.Mushroom]),
  new Set([CardType.PawedAnimal]),
  new Set([CardType.Plant]),
  new Set([CardType.Deer, CardType.ClovenhoofedAnimal]),
  new Set([CardType.Butterfly, CardType.Insect]),
];

const allowedPositionsByType: { [key in CardType]: Set<DwellerPosition> } = {
  [CardType.Alps]: new Set(Object.values(DwellerPosition)),
  [CardType.Amphibian]: new Set([DwellerPosition.Bottom]),
  [CardType.Bat]: new Set([DwellerPosition.Left, DwellerPosition.Right]),
  [CardType.Bird]: new Set([
    DwellerPosition.Top,
    DwellerPosition.Left,
    DwellerPosition.Right,
  ]),
  [CardType.Butterfly]: new Set([DwellerPosition.Top]),
  [CardType.ClovenhoofedAnimal]: new Set([
    DwellerPosition.Left,
    DwellerPosition.Right,
  ]),
  [CardType.Deer]: new Set([DwellerPosition.Left, DwellerPosition.Right]),
  [CardType.Insect]: new Set([
    DwellerPosition.Left,
    DwellerPosition.Right,
    DwellerPosition.Bottom,
  ]),
  [CardType.Mushroom]: new Set([DwellerPosition.Bottom]),
  [CardType.PawedAnimal]: new Set([
    DwellerPosition.Left,
    DwellerPosition.Right,
    DwellerPosition.Bottom,
  ]),
  [CardType.Plant]: new Set([DwellerPosition.Bottom]),
  [CardType.Shrub]: new Set(),
  [CardType.Tree]: new Set(),
  [CardType.WoodlandEdge]: new Set(Object.values(DwellerPosition)),
};

describe.each(Object.values(Dwellers))(
  "The dweller blueprint $name",
  (blueprint) => {
    it("has at least one card type", () => {
      expect(blueprint.types).not.toHaveLength(0);
    });

    it("has dweller card type", () => {
      expect(blueprint.types).not.toContain(CardType.Tree);
      expect(blueprint.types).not.toContain(CardType.Shrub);
    });

    it("has allowed type combination", () => {
      expect(allowedTypeCombinations).toContainEqual(
        new Set(blueprint.types.filter((t) => !genericCardTypes.includes(t))),
      );
    });

    it("has distinct variants", () => {
      const distinctCount = new Set(
        blueprint.variants.map(
          (v) => `${v.gameBox}|${v.position}|${v.treeSymbol}`,
        ),
      ).size;
      expect(distinctCount).toBe(blueprint.variants.length);
    });

    it("has a valid position combination", () => {
      const positions = new Set(blueprint.variants.map((v) => v.position));
      for (const position in positions) {
        for (const cardType of blueprint.types) {
          expect(allowedPositionsByType[cardType]).toContain(position);
        }
      }
    });
  },
);
