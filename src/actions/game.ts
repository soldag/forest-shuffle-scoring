import { Cave, DwellerCard, Game, GameBox, Player, WoodyPlantCard } from "@/game";
import { ScoringMode } from "@/types";

export enum GameActionType {
  CreateGame = "CREATE_GAME",
  LoadGame = "LOAD_GAME",
  AddPlayer = "ADD_PLAYER",
  SelectPlayer = "SELECT_PLAYER",
  RemovePlayer = "REMOVE_PLAYER",
  SetCave = "SET_CAVE",
  PlayWoodyPlant = "PLAY_WOODY_PLANT",
  PlayDweller = "PLAY_DWELLER",
  ExchangeWoodyPlant = "EXCHANGE_WOODY_PLANT",
  ExchangeDweller = "EXCHANGE_DWELLER",
  RemoveWoodyPlant = "REMOVE_WOODY_PLANT",
  RemoveDweller = "REMOVE_DWELLER",
}

export interface CreateGamePayload {
  scoringMode: ScoringMode;
  gameBoxes: GameBox[];
  playerName: string;
  caveName: string;
  caveCardCount: number;
}

export interface CreateGameAction {
  type: GameActionType.CreateGame;
  payload: CreateGamePayload;
}

export const createGame = (payload: CreateGamePayload): CreateGameAction => ({
  type: GameActionType.CreateGame,
  payload,
});

export interface LoadGamePayload {
  scoringMode: ScoringMode;
  game: Game;
}

export interface LoadGameAction {
  type: GameActionType.LoadGame;
  payload: LoadGamePayload;
}

export const loadGame = (payload: LoadGamePayload): LoadGameAction => ({
  type: GameActionType.LoadGame,
  payload,
});

export interface AddPlayerPayload {
  player: Player;
}

export interface AddPlayerAction {
  type: GameActionType.AddPlayer;
  payload: AddPlayerPayload;
}

export const addPlayer = (payload: AddPlayerPayload): AddPlayerAction => ({
  type: GameActionType.AddPlayer,
  payload,
});

export interface RemovePlayerPayload {
  playerId: string;
}

export interface RemovePlayerAction {
  type: GameActionType.RemovePlayer;
  payload: RemovePlayerPayload;
}

export const removePlayer = (
  payload: RemovePlayerPayload,
): RemovePlayerAction => ({
  type: GameActionType.RemovePlayer,
  payload,
});

export interface SelectPlayerPayload {
  playerId: string;
}

export interface SelectPlayerAction {
  type: GameActionType.SelectPlayer;
  payload: SelectPlayerPayload;
}

export const selectPlayer = (
  payload: SelectPlayerPayload,
): SelectPlayerAction => ({
  type: GameActionType.SelectPlayer,
  payload,
});

export interface SetCavePayload {
  playerId: string;
  cave: Cave;
}

export interface SetCaveAction {
  type: GameActionType.SetCave;
  payload: SetCavePayload;
}

export const setCave = (payload: SetCavePayload): SetCaveAction => ({
  type: GameActionType.SetCave,
  payload,
});

export interface PlayWoodyPlantPayload {
  playerId: string;
  woodyPlant: WoodyPlantCard;
}

export interface PlayWoodyPlantAction {
  type: GameActionType.PlayWoodyPlant;
  payload: PlayWoodyPlantPayload;
}

export const playWoodyPlant = (
  payload: PlayWoodyPlantPayload,
): PlayWoodyPlantAction => ({
  type: GameActionType.PlayWoodyPlant,
  payload,
});

export interface PlayDwellerPayload {
  playerId: string;
  woodyPlantId: string;
  dweller: DwellerCard;
}

export interface PlayDwellerAction {
  type: GameActionType.PlayDweller;
  payload: PlayDwellerPayload;
}

export const playDweller = (
  payload: PlayDwellerPayload,
): PlayDwellerAction => ({
  type: GameActionType.PlayDweller,
  payload,
});

export interface ExchangeWoodyPlantPayload {
  playerId: string;
  oldWoodyPlantId: string;
  newWoodyPlant: WoodyPlantCard;
}

export interface ExchangeWoodyPlantAction {
  type: GameActionType.ExchangeWoodyPlant;
  payload: ExchangeWoodyPlantPayload;
}

export const exchangeWoodyPlant = (
  payload: ExchangeWoodyPlantPayload,
): ExchangeWoodyPlantAction => ({
  type: GameActionType.ExchangeWoodyPlant,
  payload,
});

export interface ExchangeDwellerPayload {
  playerId: string;
  oldDwellerId: string;
  newDweller: DwellerCard;
}

export interface ExchangeDwellerAction {
  type: GameActionType.ExchangeDweller;
  payload: ExchangeDwellerPayload;
}

export const exchangeDweller = (
  payload: ExchangeDwellerPayload,
): ExchangeDwellerAction => ({
  type: GameActionType.ExchangeDweller,
  payload,
});

export interface RemoveWoodyPlantPayload {
  playerId: string;
  woodyPlantId: string;
}

export interface RemoveWoodyPlantAction {
  type: GameActionType.RemoveWoodyPlant;
  payload: RemoveWoodyPlantPayload;
}

export const removeWoodyPlant = (
  payload: RemoveWoodyPlantPayload,
): RemoveWoodyPlantAction => ({
  type: GameActionType.RemoveWoodyPlant,
  payload,
});

export interface RemoveDwellerPayload {
  playerId: string;
  dwellerId: string;
}

export interface RemoveDwellerAction {
  type: GameActionType.RemoveDweller;
  payload: RemoveDwellerPayload;
}

export const removeDweller = (
  payload: RemoveDwellerPayload,
): RemoveDwellerAction => ({
  type: GameActionType.RemoveDweller,
  payload,
});

export type GameAction =
  | CreateGameAction
  | LoadGameAction
  | AddPlayerAction
  | RemovePlayerAction
  | SelectPlayerAction
  | SetCaveAction
  | PlayWoodyPlantAction
  | PlayDwellerAction
  | ExchangeWoodyPlantAction
  | ExchangeDwellerAction
  | RemoveWoodyPlantAction
  | RemoveDwellerAction;
