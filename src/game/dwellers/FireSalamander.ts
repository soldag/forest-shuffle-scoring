import { scoreSet } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "FIRE_SALAMANDER";
const pointsByCount = {
  1: 5,
  2: 15,
  3: 25,
};

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Amphibian],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    // Promo card P002
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) => scoreSet(forest, dweller, pointsByCount),
};

export default blueprint;
