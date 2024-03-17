import { useContext } from "react";

import GameContext from "@/components/contexts/GameContext";
import CreateGameView from "@/components/views/CreateGameView";
import ForestView from "@/components/views/ForestView";
import ScoringView from "@/components/views/ScoringView";

const RootContainer: React.FC = () => {
  const { game, showScoring } = useContext(GameContext);

  if (!game) {
    return <CreateGameView />;
  }

  return showScoring ? <ScoringView /> : <ForestView />;
};

export default RootContainer;
