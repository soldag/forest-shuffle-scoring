import { CardType, GameBox } from "@/game/types";

export const GAME_BOX_PRIORITIES: Record<GameBox, number> = {
  [GameBox.Base]: 0,
  [GameBox.Alpine]: 1,
  [GameBox.WoodlandEdge]: 2,
  [GameBox.Exploration]: 3,
  [GameBox.PromoCards]: 4,
};

export const EXPANSION_GAME_BOXES = [
  GameBox.Alpine,
  GameBox.WoodlandEdge,
  GameBox.Exploration,
];

export const EXPANSION_CARD_TYPES = [CardType.Alps, CardType.WoodlandEdge];

export const IRRELEVANT_CARD_TYPES = [CardType.Swamp];
