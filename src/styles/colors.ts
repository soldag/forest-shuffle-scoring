import tinycolor from "tinycolor2";

import {
  CardType,
  EXPANSION_CARD_TYPES,
  GameBox,
  IRRELEVANT_CARD_TYPES,
  TreeSymbol,
} from "@/game";

const cardTypeColors: { [key in CardType]: string } = {
  [CardType.Alps]: "#9d92c0",
  [CardType.Amphibian]: "#918c88",
  [CardType.Bat]: "#22191a",
  [CardType.Bird]: "#44aae4",
  [CardType.Butterfly]: "#612c72",
  [CardType.ClovenhoofedAnimal]: "#76604b",
  [CardType.Deer]: "#bca23d",
  [CardType.Insect]: "#499882",
  [CardType.Mushroom]: "#782f04",
  [CardType.PawedAnimal]: "#b06139",
  [CardType.Person]: "#f59607",
  [CardType.Plant]: "#3a7a50",
  [CardType.Shrub]: "#7b9d53",
  [CardType.Swamp]: "#94b2c9",
  [CardType.Tree]: "#9ac81d",
  [CardType.WoodlandEdge]: "#325221",
};

const gameBoxColors: { [key in GameBox]: string } = {
  [GameBox.Alpine]: "#9d92c0",
  [GameBox.Base]: "#636b74",
  [GameBox.PromoCards]: "#d4af37",
  [GameBox.WoodlandEdge]: "#325221",
  [GameBox.Exploration]: "#94092f",
};

const treeSymbolColors: { [key in TreeSymbol]: string } = {
  [TreeSymbol.AlpineLarch]: "#927aaf",
  [TreeSymbol.Bamboo]: "#8fb24f",
  [TreeSymbol.Beech]: "#55814c",
  [TreeSymbol.Birch]: "#56b547",
  [TreeSymbol.DouglasFir]: "#8ea5c1",
  [TreeSymbol.EuropeanAlder]: "#629ede",
  [TreeSymbol.GoldenPalm]: "#e2cd4c",
  [TreeSymbol.HorseChestnut]: "#f79d4d",
  [TreeSymbol.Linden]: "#f3c909",
  [TreeSymbol.Oak]: "#c27e29",
  [TreeSymbol.SilverFir]: "#568f9c",
  [TreeSymbol.SwissPine]: "#dea0c1",
  [TreeSymbol.Sycamore]: "#e30942",
};

export const HOVER_BRIGHTNESS = -5;
export const ACTIVE_BRIGHTNESS = -10;

export const getBackgroundForCardTypes = (
  cardTypes: CardType[],
  gradientDirection: "horizontal" | "vertical" = "horizontal",
  adjustBrightness: number = 0,
) => {
  const colors = cardTypes
    .filter((t) => !EXPANSION_CARD_TYPES.includes(t))
    .filter((t) => !IRRELEVANT_CARD_TYPES.includes(t))
    .map((t) =>
      tinycolor(cardTypeColors[t]).lighten(adjustBrightness).toString(),
    );

  if (colors.length <= 1) {
    return colors[0];
  }

  const gradientSide = gradientDirection === "horizontal" ? "right" : "bottom";
  const gradientColors = colors.join(", ");
  return `linear-gradient(to ${gradientSide}, ${gradientColors})`;
};

export const getColorOfGameBox = (
  gameBox: GameBox,
  adjustBrightness: number = 0,
) => tinycolor(gameBoxColors[gameBox]).lighten(adjustBrightness).toString();

export const getColorOfTreeSymbol = (
  symbol: TreeSymbol,
  adjustBrightness: number = 0,
) => tinycolor(treeSymbolColors[symbol]).lighten(adjustBrightness).toString();
