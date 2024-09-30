import { countCardTypes } from "../../scoring/helpers";
import {
  CardType,
  Expansion,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "SWISS_PINE";
const count = 7;
const pointsPerAlpsCard = 1;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  expansion: Expansion.Alpine,
  types: [CardType.Alps, CardType.Tree],
  cost: 2,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.SwissPine,
      count,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Alps]) * pointsPerAlpsCard,
};

export default blueprint;
