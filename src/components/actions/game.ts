import { DwellerCard, TreeCard } from "@/game";

export enum GameActionType {
  CreateGame = "CREATE_GAME",
  ResetGame = "RESET_GAME",
  AddPlayer = "ADD_PLAYER",
  SelectPlayer = "SELECT_PLAYER",
  RemovePlayer = "REMOVE_PLAYER",
  SetCave = "SET_CAVE",
  PlayTree = "PLAY_TREE",
  PlayDweller = "PLAY_DWELLER",
  ExchangeTree = "EXCHANGE_TREE",
  ExchangeDweller = "EXCHANGE_DWELLER",
  RemoveTree = "REMOVE_TREE",
  RemoveDweller = "REMOVE_DWELLER",
}

export interface CreateGamePayload {
  playerName: string;
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

export interface ResetGameAction {
  type: GameActionType.ResetGame;
}

export const resetGame = (): ResetGameAction => ({
  type: GameActionType.ResetGame,
});

export interface AddPlayerPayload {
  playerName: string;
  caveCardCount: number;
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

export const SelectPlayer = (
  payload: SelectPlayerPayload,
): SelectPlayerAction => ({
  type: GameActionType.SelectPlayer,
  payload,
});

export interface SetCavePayload {
  playerId: string;
  count: number;
}

export interface SetCaveAction {
  type: GameActionType.SetCave;
  payload: SetCavePayload;
}

export const setCave = (payload: SetCavePayload): SetCaveAction => ({
  type: GameActionType.SetCave,
  payload,
});

export interface PlayTreePayload {
  playerId: string;
  tree: TreeCard;
}

export interface PlayTreeAction {
  type: GameActionType.PlayTree;
  payload: PlayTreePayload;
}

export const playTree = (payload: PlayTreePayload): PlayTreeAction => ({
  type: GameActionType.PlayTree,
  payload,
});

export interface PlayDwellerPayload {
  playerId: string;
  treeId: string;
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

export interface ExchangeTreePayload {
  playerId: string;
  oldTreeId: string;
  newTree: TreeCard;
}

export interface ExchangeTreeAction {
  type: GameActionType.ExchangeTree;
  payload: ExchangeTreePayload;
}

export const exchangeTree = (
  payload: ExchangeTreePayload,
): ExchangeTreeAction => ({
  type: GameActionType.ExchangeTree,
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

export interface RemoveTreePayload {
  playerId: string;
  treeId: string;
}

export interface RemoveTreeAction {
  type: GameActionType.RemoveTree;
  payload: RemoveTreePayload;
}

export const removeTree = (payload: RemoveTreePayload): RemoveTreeAction => ({
  type: GameActionType.RemoveTree,
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
  | ResetGameAction
  | AddPlayerAction
  | RemovePlayerAction
  | SelectPlayerAction
  | SetCaveAction
  | PlayTreeAction
  | PlayDwellerAction
  | ExchangeTreeAction
  | ExchangeDwellerAction
  | RemoveTreeAction
  | RemoveDwellerAction;
