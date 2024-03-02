import { describe, expect, it } from "@jest/globals";

import * as Dwellers from "../../dwellers";
import * as Trees from "../../trees";
import Sapling from "../../trees/Sapling";
import { CardType } from "../../types";

describe("The tree blueprint", () => {
  for (const blueprint of Object.values(Trees)) {
    describe(blueprint.name, () => {
      it("has a unique name", () => {
        expect(
          Object.values(Dwellers).filter((b) => b.name === blueprint.name),
        ).toHaveLength(0);
        expect(
          Object.values(Trees).filter((b) => b.name === blueprint.name),
        ).toHaveLength(1);
      });

      it("has only tree card type", () => {
        expect(blueprint.types).toHaveLength(1);
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
