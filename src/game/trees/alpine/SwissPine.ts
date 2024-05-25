import { countCardTypes } from "../../scoring/helpers";
import {
  CardType,
  Expansion,
  TreeCardBlueprint,
  TreeSymbol,
} from "../../types";

const name = "SWISS_PINE";
const pointsPerAlpsCard = 1;

const blueprint: TreeCardBlueprint = {
  name,
  expansion: Expansion.Alpine,
  types: [CardType.Alps, CardType.Tree],
  treeSymbol: TreeSymbol.SwissPine,
  cost: 2,
  count: 7,
  isPartOfDeck: true,
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Alps]) * pointsPerAlpsCard,
};

export default blueprint;
