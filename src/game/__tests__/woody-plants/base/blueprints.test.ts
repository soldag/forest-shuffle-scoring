import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "../../../dwellers";
import { CardType } from "../../../types";
import * as WoodyPlants from "../../../woody-plants";
import { Sapling } from "../../../woody-plants";

describe("The woody plant blueprint", () => {
  for (const blueprint of Object.values(WoodyPlants)) {
    describe(blueprint.name, () => {
      it("has a unique name", () => {
        expect(
          Object.values(Dwellers).filter((b) => b.name === blueprint.name),
        ).toHaveLength(0);
        expect(
          Object.values(WoodyPlants).filter((b) => b.name === blueprint.name),
        ).toHaveLength(1);
      });

      it("has at least one card type", () => {
        expect(blueprint.types).not.toHaveLength(0);
      });

      it("has woody plant card type", () => {
        expect(blueprint.types.every((t) => t === CardType.Tree)).toBe(true);
      });

      it("has distinct variants", () => {
        const distinctCount = new Set(
          blueprint.variants.map((v) => v.treeSymbol),
        ).size;
        expect(distinctCount).toBe(blueprint.variants.length);
      });

      it("has count that matches variants", () => {
        expect(blueprint.count).toBe(
          blueprint.variants.map((v) => v.count).reduce((a, b) => a + b, 0),
        );
      });

      if (blueprint.types.includes(CardType.Tree)) {
        it("has exactly one variant", () => {
          expect(blueprint.variants.length).toBe(1);
        });

        if (blueprint === Sapling) {
          it("has no tree symbol", () => {
            expect(blueprint.variants[0].treeSymbol).toBeUndefined();
          });
        } else {
          it("has a matching tree symbol", () => {
            expect(blueprint.variants[0].treeSymbol).toBe(blueprint.name);
          });
        }
      }
    });
  }
});
