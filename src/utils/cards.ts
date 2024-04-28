import { DwellerPosition } from "@/game";

export const isPositionX = (position: DwellerPosition) =>
  [DwellerPosition.Left, DwellerPosition.Right].includes(position);

export const isPositionY = (position: DwellerPosition) =>
  [DwellerPosition.Top, DwellerPosition.Bottom].includes(position);
