import { ReactNode, Reducer, createContext, useReducer } from "react";

import { GameAction, GameActionType } from "@/components/actions/game";
import {
  Game,
  addPlayer,
  createGame,
  playDweller,
  playTree,
  removeDweller,
  removePlayer,
  removeTree,
} from "@/game";
import { createPlayer } from "@/game/factory";
import { exchangeDweller, exchangeTree } from "@/game/operations";

interface State {
  game: Game | null;
  playerId: string | null;
  showScoring: boolean;
}

const defaultState: State = {
  game: null,
  playerId: null,
  showScoring: false,
};

interface GameContextType extends State {
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType>({
  ...defaultState,
  dispatch: () => {},
});

interface GameContextProviderProps {
  children?: ReactNode;
}

const reducer: Reducer<State, GameAction> = (state, action) => {
  if (!state.game) {
    if (action.type === GameActionType.CreateGame) {
      const game = createGame();
      const player = createPlayer(action.payload.playerName);
      return {
        ...state,
        game: addPlayer(game, player),
        playerId: player.id,
      };
    }

    return state;
  }

  switch (action.type) {
    case GameActionType.ResetGame:
      return {
        ...state,
        game: null,
        playerId: null,
        showScoring: false,
      };

    case GameActionType.AddPlayer: {
      const player = createPlayer(action.payload.playerName);
      return {
        ...state,
        game: addPlayer(state.game, player),
        playerId: player.id,
      };
    }

    case GameActionType.RemovePlayer:
      return {
        ...state,
        game: removePlayer(state.game, action.payload.playerId),
      };

    case GameActionType.SelectPlayer:
      return {
        ...state,
        playerId: action.payload.playerId,
      };

    case GameActionType.PlayTree:
      return {
        ...state,
        game: playTree(
          state.game,
          action.payload.playerId,
          action.payload.tree,
        ),
      };

    case GameActionType.PlayDweller:
      return {
        ...state,
        game: playDweller(
          state.game,
          action.payload.playerId,
          action.payload.treeId,
          action.payload.dweller,
        ),
      };

    case GameActionType.ExchangeTree:
      return {
        ...state,
        game: exchangeTree(
          state.game,
          action.payload.oldTreeId,
          action.payload.newTree,
        ),
      };

    case GameActionType.ExchangeDweller:
      return {
        ...state,
        game: exchangeDweller(
          state.game,
          action.payload.oldDwellerId,
          action.payload.newDweller,
        ),
      };

    case GameActionType.RemoveTree:
      return {
        ...state,
        game: removeTree(state.game, action.payload.treeId),
      };

    case GameActionType.RemoveDweller:
      return {
        ...state,
        game: removeDweller(state.game, action.payload.dwellerId),
      };

    case GameActionType.ScoreGame:
      return {
        ...state,
        showScoring: true,
      };

    default:
      return state;
  }
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
