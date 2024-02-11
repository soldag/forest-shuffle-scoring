import tinycolor from "tinycolor2";

import { CardType, TreeSymbol } from "@/cards";

const CARD_TYPE_COLORS = {
  [CardType.Amphibian]: "#918c88",
  [CardType.Bat]: "#22191a",
  [CardType.Bird]: "#44aae4",
  [CardType.Butterfly]: "#612c72",
  [CardType.ClovenhoofedAnimal]: "#76604b",
  [CardType.Deer]: "#bca23d",
  [CardType.Insect]: "#499882",
  [CardType.Mushroom]: "#782f04",
  [CardType.PawedAnimal]: "#b06139",
  [CardType.Plant]: "#3a7a50",
  [CardType.Tree]: "#a9d049",
};

const TREE_SYMBOL_COLORS = {
  [TreeSymbol.Sycamore]: "#e30942",
  [TreeSymbol.Birch]: "#56b547",
  [TreeSymbol.Beech]: "#55814c",
  [TreeSymbol.DouglasFir]: "#8ea5c1",
  [TreeSymbol.Oak]: "#c27e29",
  [TreeSymbol.HorseChestnut]: "#f79d4d",
  [TreeSymbol.Linden]: "#f3c909",
  [TreeSymbol.SilverFir]: "#568f9c",
};

export const HOVER_BRIGHTNESS = -5;
export const ACTIVE_BRIGHTNESS = -10;

export const getBackgroundForCardTypes = (
  cardTypes: CardType[],
  gradientDirection: "horizontal" | "vertical" = "horizontal",
  adjustBrightness: number = 0,
) => {
  const colors = cardTypes.map((t) =>
    tinycolor(CARD_TYPE_COLORS[t]).lighten(adjustBrightness).toString(),
  );

  if (colors.length <= 1) {
    return colors[0];
  }

  const gradientSide = gradientDirection === "horizontal" ? "right" : "bottom";
  const gradientColors = colors.join(", ");
  return `linear-gradient(to ${gradientSide}, ${gradientColors})`;
};

export const getColorOfTreeSymbol = (
  symbol: TreeSymbol,
  adjustBrightness: number = 0,
) => tinycolor(TREE_SYMBOL_COLORS[symbol]).lighten(adjustBrightness).toString();
