import { useContext } from "react";
import { Redirect } from "wouter";

import GameContext from "@/components/contexts/GameContext";
import { Game } from "@/game";

interface RequireGameProps {
  game: Game;
}

export const requireGame = <T extends RequireGameProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const Component = (props: Omit<T, "game">) => {
    const { game } = useContext(GameContext);
    if (!game) {
      return <Redirect to="/" />;
    }

    return <WrappedComponent {...(props as T)} game={game} />;
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  Component.displayName = `requireGame(${displayName})`;

  return Component;
};
