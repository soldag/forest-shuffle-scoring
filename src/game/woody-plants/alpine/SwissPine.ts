import { countCardTypes } from "../../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "SWISS_PINE";
const pointsPerAlpsCard = 1;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Alpine,
  types: [CardType.Alps, CardType.Tree],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.SwissPine,
      count: 7,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Alps]) * pointsPerAlpsCard,
};

export default blueprint;
