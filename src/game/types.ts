export enum GameBox {
  Alpine = "ALPINE",
  Base = "BASE",
  Exploration = "EXPLORATION",
  PromoCards = "PROMO_CARDS",
  WoodlandEdge = "WOODLAND_EDGE",
}

export enum CardType {
  Alps = "ALPS",
  Amphibian = "AMPHIBIAN",
  Bat = "BAT",
  Bird = "BIRD",
  Butterfly = "BUTTERFLY",
  ClovenhoofedAnimal = "CLOVENHOOFED_ANIMAL",
  Deer = "DEER",
  Insect = "INSECT",
  Mushroom = "MUSHROOM",
  PawedAnimal = "PAWED_ANIMAL",
  Person = "PERSON",
  Plant = "PLANT",
  Tree = "TREE",
  Shrub = "SHRUB",
  WoodlandEdge = "WOODLAND_EDGE",
}

export enum DwellerPosition {
  Top = "TOP",
  Bottom = "BOTTOM",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum TreeSymbol {
  AlpineLarch = "ALPINE_LARCH",
  Beech = "BEECH",
  Birch = "BIRCH",
  DouglasFir = "DOUGLAS_FIR",
  GoldenPalm = "GOLDEN_PALM",
  HorseChestnut = "HORSE_CHESTNUT",
  Linden = "LINDEN",
  Oak = "OAK",
  SilverFir = "SILVER_FIR",
  SwissPine = "SWISS_PINE",
  Sycamore = "SYCAMORE",
}

export interface Cave {
  id: string;
  name: string;
  gameBox: GameBox;
  cardCount: number;
}

export interface Card {
  id: string;
  name: string;
  countsAs?: string;
  gameBox: GameBox;
  types: CardType[];
  treeSymbol?: TreeSymbol;
  isPartOfDeck: boolean;
}

export interface DwellerModifierContext {
  woodyPlant: WoodyPlantCard;
  dweller: DwellerCard;
}

export interface DwellerModifiers {
  allowsSlotSharing?: (
    context: DwellerModifierContext,
    candidate: DwellerCard,
  ) => boolean;
  requiresSlotSharing?: (context: DwellerModifierContext) => boolean;
  woodyPlantCount?: (context: DwellerModifierContext) => number;
}

export interface DwellerCard extends Card {
  position: DwellerPosition;
  modifiers?: DwellerModifiers;
}

export interface WoodyPlantCard extends Card {
  dwellers: {
    [DwellerPosition.Top]: DwellerCard[];
    [DwellerPosition.Bottom]: DwellerCard[];
    [DwellerPosition.Left]: DwellerCard[];
    [DwellerPosition.Right]: DwellerCard[];
  };
}

export interface Deck {
  caves: Cave[];
  dwellers: DwellerCard[];
  woodyPlants: WoodyPlantCard[];
}

export interface Forest {
  woodyPlants: WoodyPlantCard[];
  cave: Cave;
}

export interface Player {
  id: string;
  name: string;
  forest: Forest;
}

export interface Game {
  id: string;
  gameBoxes: GameBox[];
  deck: Deck;
  players: Player[];
}

export interface CaveBlueprint {
  name: string;
  gameBox: GameBox;
  count: number;
  score: (forest: Forest) => number;
}

export interface CardBlueprint {
  name: string;
  countsAs?: string;
  types: CardType[];
  cost: number;
}

export interface WoodyPlantScoringArgs {
  game: Game;
  forest: Forest;
  woodyPlant: WoodyPlantCard;
}

export interface WoodyPlantCardBlueprint extends CardBlueprint {
  variants: WoodyPlantVariant[];
  isPartOfDeck: boolean;
  score: (args: WoodyPlantScoringArgs) => number;
}

export interface WoodyPlantVariant {
  gameBox: GameBox;
  treeSymbol?: TreeSymbol;
  extraTypes?: CardType[];
  count: number;
}

export interface DwellerVariant {
  gameBox: GameBox;
  position: DwellerPosition;
  treeSymbol: TreeSymbol;
  extraTypes?: CardType[];
  count: number;
}

export interface DwellerScoringArgs {
  game: Game;
  forest: Forest;
  woodyPlant: WoodyPlantCard;
  dweller: DwellerCard;
}

export interface DwellerCardBlueprint extends CardBlueprint {
  variants: DwellerVariant[];
  modifiers?: DwellerModifiers;
  isPartOfDeck: boolean;
  score: (args: DwellerScoringArgs) => number;
}

export interface PlayerScoring {
  playerId: string;
  total: number;
  trees: number;
  dwellerTop: number;
  dwellerBottom: number;
  dwellerLeft: number;
  dwellerRight: number;
  cave: number;
}

export interface PlayerScoringWithRank extends PlayerScoring {
  rank: number;
}

export interface GameScoring {
  players: PlayerScoringWithRank[];
}
