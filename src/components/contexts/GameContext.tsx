import { ReactNode, Reducer, createContext, useReducer } from "react";

import { GameAction, GameActionType } from "@/actions/game";
import {
  Game,
  addPlayer,
  createGame,
  playDweller,
  playWoodyPlant,
  removeDweller,
  removePlayer,
  removeWoodyPlant,
} from "@/game";
import { createPlayer } from "@/game/factory";
import {
  exchangeDweller,
  exchangeWoodyPlant,
  setCaveCardCount,
} from "@/game/operations";

interface State {
  game: Game | null;
  playerId: string | null;
}

const defaultState: State = {
  game: null,
  playerId: null,
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
  if (action.type === GameActionType.CreateGame) {
    const game = createGame(action.payload.gameBoxes);
    const player = createPlayer(
      action.payload.playerName,
      action.payload.caveCardCount,
    );
    return {
      ...state,
      game: addPlayer(game, player),
      playerId: player.id,
    };
  }

  if (!state.game) {
    return state;
  }

  switch (action.type) {
    case GameActionType.AddPlayer: {
      const player = createPlayer(
        action.payload.playerName,
        action.payload.caveCardCount,
      );
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

    case GameActionType.SetCave:
      return {
        ...state,
        game: setCaveCardCount(
          state.game,
          action.payload.playerId,
          action.payload.count,
        ),
      };

    case GameActionType.PlayWoodyPlant:
      return {
        ...state,
        game: playWoodyPlant(
          state.game,
          action.payload.playerId,
          action.payload.woodyPlant,
        ),
      };

    case GameActionType.PlayDweller:
      return {
        ...state,
        game: playDweller(
          state.game,
          action.payload.playerId,
          action.payload.woodyPlantId,
          action.payload.dweller,
        ),
      };

    case GameActionType.ExchangeWoodyPlant:
      return {
        ...state,
        game: exchangeWoodyPlant(
          state.game,
          action.payload.oldWoodyPlantId,
          action.payload.newWoodyPlant,
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

    case GameActionType.RemoveWoodyPlant:
      return {
        ...state,
        game: removeWoodyPlant(state.game, action.payload.woodyPlantId),
      };

    case GameActionType.RemoveDweller:
      return {
        ...state,
        game: removeDweller(state.game, action.payload.dwellerId),
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
