import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "../../dwellers";
import { CardType, GameBox } from "../../types";
import * as WoodyPlants from "../../woody-plants";
import { Sapling } from "../../woody-plants";

describe.each(Object.values(WoodyPlants))(
  "The woody plant blueprint $name",
  (blueprint) => {
    describe(blueprint.name, () => {
      it("has a unique name", () => {
        const blueprints = [
          ...Object.values(Dwellers),
          ...Object.values(WoodyPlants),
        ];
        const blueprintsWithSameName = blueprints.filter(
          (b) => b.name === blueprint.name,
        );

        expect(blueprintsWithSameName).toHaveLength(1);
      });

      it("has at least one card type", () => {
        expect(blueprint.types).not.toHaveLength(0);
      });

      it("has woody plant card type", () => {
        expect(
          blueprint.types.some((t) =>
            [CardType.Shrub, CardType.Tree].includes(t),
          ),
        ).toBe(true);
      });

      it("has distinct variants", () => {
        const distinctCount = new Set(
          blueprint.variants.map((v) => v.treeSymbol),
        ).size;
        expect(distinctCount).toBe(blueprint.variants.length);
      });

      if (blueprint.types.includes(CardType.Tree)) {
        it("has exactly one variant", () => {
          expect(blueprint.variants.length).toBe(1);
        });

        const variant = blueprint.variants[0];
        if (blueprint === Sapling) {
          it("has no tree symbol", () => {
            expect(variant.treeSymbol).toBeUndefined();
          });
        } else if (variant.gameBox !== GameBox.PromoCards) {
          it("has a matching tree symbol", () => {
            expect(variant.treeSymbol).toBe(blueprint.name);
          });
        }
      }
    });
  },
);
