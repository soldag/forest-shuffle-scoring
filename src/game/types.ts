export enum CardType {
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
  Sycamore = "SYCAMORE",
  Birch = "BIRCH",
  Beech = "BEECH",
  DouglasFir = "DOUGLAS_FIR",
  Oak = "OAK",
  HorseChestnut = "HORSE_CHESTNUT",
  Linden = "LINDEN",
  SilverFir = "SILVER_FIR",
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
  cave: Card[];
}

export interface Player {
  id: string;
  name: string;
  forest: Forest;
}

export interface Game {
  deck: Deck;
  players: Player[];
}

export interface CardBlueprint {
  name: string;
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
  total: number;
  trees: number;
  dwellerTop: number;
  dwellerBottom: number;
  dwellerLeft: number;
  dwellerRight: number;
  cave: number;
}

export interface GameScoring {
  players: { [playerId: string]: PlayerScoring };
}
