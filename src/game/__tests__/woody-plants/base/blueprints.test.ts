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

      it("has tree card type", () => {
        expect(blueprint.types).toContain(CardType.Tree);
      });

      if (blueprint === Sapling) {
        it("has no tree symbol", () => {
          expect(blueprint.treeSymbol).toBeUndefined();
        });
      } else {
        it("has a matching tree symbol", () => {
          expect(blueprint.treeSymbol).toBe(blueprint.name);
        });
      }
    });
  }
});
