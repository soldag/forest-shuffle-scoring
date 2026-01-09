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
  setCave,
} from "@/game/operations";
import { ScoringMode } from "@/types";
import invariant from "@/utils/invariant";

interface State {
  scoringMode: ScoringMode | null;
  game: Game | null;
  playerId: string | null;
}

const defaultState: State = {
  scoringMode: null,
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

    const cave = game.deck.caves.find(
      (c) => c.name === action.payload.caveName,
    );
    invariant(cave);
    const caveWithCardCount = {
      ...cave,
      cardCount: action.payload.caveCardCount,
    };

    const player = createPlayer(action.payload.playerName, caveWithCardCount);

    return {
      ...state,
      scoringMode: action.payload.scoringMode,
      game: addPlayer(game, player),
      playerId: player.id,
    };
  } else if (action.type === GameActionType.LoadGame) {
    return {
      ...state,
      scoringMode: action.payload.scoringMode,
      game: action.payload.game,
      playerId: action.payload.game.players[0].id,
    }
  }

  if (!state.game) {
    return state;
  }

  switch (action.type) {
    case GameActionType.AddPlayer:
      return {
        ...state,
        game: addPlayer(state.game, action.payload.player),
        playerId: action.payload.player.id,
      };

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
        game: setCave(state.game, action.payload.playerId, action.payload.cave),
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
