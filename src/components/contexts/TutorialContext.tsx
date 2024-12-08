import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

import GameContext from "@/components/contexts/GameContext";
import { getDwellersOfForest } from "@/game";

interface TutorialContextType {
  exchangeCardTooltipTarget?: string;
  onCardClick: () => void;
  showAddTreeTooltip: boolean;
  showAddDwellerTooltip: boolean;
  showExchangeCardTooltip: boolean;
  showSwipeToAddTreeTooltip: boolean;
}

const TutorialContext = createContext<TutorialContextType>({
  onCardClick: () => {},
  showAddTreeTooltip: false,
  showAddDwellerTooltip: false,
  showExchangeCardTooltip: false,
  showSwipeToAddTreeTooltip: false,
});

interface TutorialContextProviderProps {
  children: ReactNode;
}

export const TutorialContextProvider = ({
  children,
}: TutorialContextProviderProps) => {
  const { game } = useContext(GameContext);

  const [wasCompleted, setWasCompleted] = useLocalStorage(
    "tutorial-completed",
    false,
  );

  const [showAddTreeTooltip, setShowAddTreeTooltip] = useState(!wasCompleted);
  const [showAddDwellerTooltip, setShowAddDwellerTooltip] = useState(false);
  const [showExchangeCardTooltip, setShowExchangeCardTooltip] = useState(false);
  const [exchangeCardTooltipTarget, setExchangeCardTooltipTarget] =
    useState<string>();
  const [showSwipeToAddTreeTooltip, setShowSwipeToAddTreeTooltip] =
    useState(false);

  const gameId = game?.id;
  useEffect(() => {
    setShowAddTreeTooltip(!wasCompleted);
    setShowAddDwellerTooltip(false);
    setShowExchangeCardTooltip(false);
    setExchangeCardTooltipTarget(undefined);
    setShowSwipeToAddTreeTooltip(false);
  }, [gameId, wasCompleted]);

  const hasWoodyPlant = game?.players.some(
    (p) => p.forest.woodyPlants.length > 0,
  );
  useEffect(() => {
    if (showAddTreeTooltip && hasWoodyPlant && !wasCompleted) {
      setShowAddTreeTooltip(false);
      setShowAddDwellerTooltip(true);
    }
  }, [showAddTreeTooltip, hasWoodyPlant, wasCompleted]);

  const dweller = game?.players?.flatMap((p) =>
    getDwellersOfForest(p.forest),
  )[0];
  useEffect(() => {
    if (showAddDwellerTooltip && dweller && !wasCompleted) {
      setShowAddDwellerTooltip(false);
      setShowExchangeCardTooltip(true);
      setExchangeCardTooltipTarget(dweller.id);
    }
  }, [showAddDwellerTooltip, dweller, wasCompleted]);

  const onCardClick = useCallback(() => {
    if (showExchangeCardTooltip && !wasCompleted) {
      setShowExchangeCardTooltip(false);
      setShowSwipeToAddTreeTooltip(true);
    }
  }, [showExchangeCardTooltip, wasCompleted]);

  const hasSecondTree = game?.players.some(
    (p) => p.forest.woodyPlants.length > 1,
  );
  useEffect(() => {
    if (showSwipeToAddTreeTooltip && hasSecondTree && !wasCompleted) {
      setShowSwipeToAddTreeTooltip(false);
      setWasCompleted(true);
    }
  }, [showSwipeToAddTreeTooltip, hasSecondTree, wasCompleted, setWasCompleted]);

  return (
    <TutorialContext.Provider
      value={{
        exchangeCardTooltipTarget,
        onCardClick,
        showAddTreeTooltip,
        showAddDwellerTooltip,
        showExchangeCardTooltip,
        showSwipeToAddTreeTooltip,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export default TutorialContext;
