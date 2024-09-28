import { DwellerCard, DwellerPosition, WoodyPlantCard } from "@/game";

export const CARD_HEIGHT = {
  sm: "259px",
  md: "323px",
  lg: "388px",
};

export const CARD_WIDTH = {
  sm: "165px",
  md: "208px",
  lg: "250px",
};

export const isPositionX = (position: DwellerPosition) =>
  [DwellerPosition.Left, DwellerPosition.Right].includes(position);

export const isPositionY = (position: DwellerPosition) =>
  [DwellerPosition.Top, DwellerPosition.Bottom].includes(position);

export const hasHorizontalSplit = (card: DwellerCard | WoodyPlantCard) =>
  "position" in card && isPositionY(card.position);

export const hasVerticalSplit = (card: DwellerCard | WoodyPlantCard) =>
  "position" in card && isPositionX(card.position);
