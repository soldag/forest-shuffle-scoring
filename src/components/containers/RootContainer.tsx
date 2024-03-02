import { useContext } from "react";

import GameContext from "@/components/contexts/GameContext";
import CreateGameView from "@/components/views/CreateGameView";
import ForestView from "@/components/views/ForestView";

const RootContainer: React.FC = () => {
  const { game } = useContext(GameContext);
  return game ? <ForestView /> : <CreateGameView />;
};

export default RootContainer;
