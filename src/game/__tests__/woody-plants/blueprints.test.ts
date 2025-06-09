import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "../../dwellers";
import { CardType } from "../../types";
import * as WoodyPlants from "../../woody-plants";

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
          blueprint.variants.map((v) => `${v.gameBox}|${v.treeSymbol}`),
        ).size;
        expect(distinctCount).toBe(blueprint.variants.length);
      });
    });
  },
);
