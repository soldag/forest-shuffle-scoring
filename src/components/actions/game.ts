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
  ScoreGame = "SCORE_GAME",
}

interface CreateGamePayload {
  playerName: string;
  caveCardCount: number;
}

interface CreateGameAction {
  type: GameActionType.CreateGame;
  payload: CreateGamePayload;
}

export const createGame = (payload: CreateGamePayload): CreateGameAction => ({
  type: GameActionType.CreateGame,
  payload,
});

interface ResetGameAction {
  type: GameActionType.ResetGame;
}

export const resetGame = (): ResetGameAction => ({
  type: GameActionType.ResetGame,
});

interface AddPlayerPayload {
  playerName: string;
  caveCardCount: number;
}

interface AddPlayerAction {
  type: GameActionType.AddPlayer;
  payload: AddPlayerPayload;
}

export const addPlayer = (payload: AddPlayerPayload): AddPlayerAction => ({
  type: GameActionType.AddPlayer,
  payload,
});

interface RemovePlayerPayload {
  playerId: string;
}

interface RemovePlayerAction {
  type: GameActionType.RemovePlayer;
  payload: RemovePlayerPayload;
}

export const removePlayer = (
  payload: RemovePlayerPayload,
): RemovePlayerAction => ({
  type: GameActionType.RemovePlayer,
  payload,
});

interface SelectPlayerPayload {
  playerId: string;
}

interface SelectPlayerAction {
  type: GameActionType.SelectPlayer;
  payload: SelectPlayerPayload;
}

export const SelectPlayer = (
  payload: SelectPlayerPayload,
): SelectPlayerAction => ({
  type: GameActionType.SelectPlayer,
  payload,
});

interface SetCavePayload {
  playerId: string;
  count: number;
}

interface SetCaveAction {
  type: GameActionType.SetCave;
  payload: SetCavePayload;
}

export const setCave = (payload: SetCavePayload): SetCaveAction => ({
  type: GameActionType.SetCave,
  payload,
});

interface PlayTreePayload {
  playerId: string;
  tree: TreeCard;
}

interface PlayTreeAction {
  type: GameActionType.PlayTree;
  payload: PlayTreePayload;
}

export const playTree = (payload: PlayTreePayload): PlayTreeAction => ({
  type: GameActionType.PlayTree,
  payload,
});

interface PlayDwellerPayload {
  playerId: string;
  treeId: string;
  dweller: DwellerCard;
}

interface PlayDwellerAction {
  type: GameActionType.PlayDweller;
  payload: PlayDwellerPayload;
}

export const playDweller = (
  payload: PlayDwellerPayload,
): PlayDwellerAction => ({
  type: GameActionType.PlayDweller,
  payload,
});

interface ExchangeTreePayload {
  playerId: string;
  oldTreeId: string;
  newTree: TreeCard;
}

interface ExchangeTreeAction {
  type: GameActionType.ExchangeTree;
  payload: ExchangeTreePayload;
}

export const exchangeTree = (
  payload: ExchangeTreePayload,
): ExchangeTreeAction => ({
  type: GameActionType.ExchangeTree,
  payload,
});

interface ExchangeDwellerPayload {
  playerId: string;
  oldDwellerId: string;
  newDweller: DwellerCard;
}

interface ExchangeDwellerAction {
  type: GameActionType.ExchangeDweller;
  payload: ExchangeDwellerPayload;
}

export const exchangeDweller = (
  payload: ExchangeDwellerPayload,
): ExchangeDwellerAction => ({
  type: GameActionType.ExchangeDweller,
  payload,
});

interface RemoveTreePayload {
  playerId: string;
  treeId: string;
}

interface RemoveTreeAction {
  type: GameActionType.RemoveTree;
  payload: RemoveTreePayload;
}

export const removeTree = (payload: RemoveTreePayload): RemoveTreeAction => ({
  type: GameActionType.RemoveTree,
  payload,
});

interface RemoveDwellerPayload {
  playerId: string;
  dwellerId: string;
}

interface RemoveDwellerAction {
  type: GameActionType.RemoveDweller;
  payload: RemoveDwellerPayload;
}

export const removeDweller = (
  payload: RemoveDwellerPayload,
): RemoveDwellerAction => ({
  type: GameActionType.RemoveDweller,
  payload,
});

interface ScoreGameAction {
  type: GameActionType.ScoreGame;
}

export const scoreGame = (): ScoreGameAction => ({
  type: GameActionType.ScoreGame,
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
  | RemoveDwellerAction
  | ScoreGameAction;
