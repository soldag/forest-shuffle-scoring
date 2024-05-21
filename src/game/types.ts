export enum Expansion {
  Alpine = "ALPINE",
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
  Plant = "PLANT",
  Tree = "TREE",
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
  HorseChestnut = "HORSE_CHESTNUT",
  Linden = "LINDEN",
  Oak = "OAK",
  SilverFir = "SILVER_FIR",
  SwissPine = "SWISS_PINE",
  Sycamore = "SYCAMORE",
}

export interface Card {
  id: string;
  name: string;
  types: CardType[];
  treeSymbol?: TreeSymbol;
  isPartOfDeck: boolean;
}

export interface DwellerModifiers {
  sharesSlotWith: number;
  treeCount: number;
}

export interface DwellerCard extends Card {
  position: DwellerPosition;
  modifiers: DwellerModifiers;
}

export interface TreeCard extends Card {
  dwellers: {
    [DwellerPosition.Top]: DwellerCard[];
    [DwellerPosition.Bottom]: DwellerCard[];
    [DwellerPosition.Left]: DwellerCard[];
    [DwellerPosition.Right]: DwellerCard[];
  };
}

export interface Deck {
  dwellers: DwellerCard[];
  trees: TreeCard[];
}

export interface Forest {
  trees: TreeCard[];
  caveCardCount: number;
}

export interface Player {
  id: string;
  name: string;
  forest: Forest;
}

export interface Game {
  id: string;
  deck: Deck;
  players: Player[];
}

export interface CardBlueprint {
  name: string;
  expansion?: Expansion;
  types: CardType[];
  cost: number;
  count: number;
}

export interface TreeScoringArgs {
  game: Game;
  forest: Forest;
  tree: TreeCard;
}

export interface TreeCardBlueprint extends CardBlueprint {
  treeSymbol?: TreeSymbol;
  isPartOfDeck: boolean;
  score: (args: TreeScoringArgs) => number;
}

export interface DwellerVariant {
  position: DwellerPosition;
  treeSymbol: TreeSymbol;
  count: number;
}

export interface DwellerScoringArgs {
  game: Game;
  forest: Forest;
  tree: TreeCard;
  dweller: DwellerCard;
}

export interface DwellerCardBlueprint extends CardBlueprint {
  variants: DwellerVariant[];
  modifiers: DwellerModifiers;
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
