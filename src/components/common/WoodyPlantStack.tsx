import * as _ from "lodash-es";
import { ReactNode, forwardRef, useEffect, useRef } from "react";

import { Box, Stack } from "@mui/joy";

import AddCardButton from "@/components/common/AddCardButton";
import WoodyPlantSlot from "@/components/common/WoodyPlantSlot";
import AddTreeTooltip from "@/components/common/tutorial/AddTreeTooltip";
import {
  DwellerCard,
  DwellerPosition,
  Game,
  WoodyPlantCard,
  getDwellerCandidates,
  getDwellersOfWoodyPlant,
} from "@/game";
import { CARD_HEIGHT, CARD_WIDTH } from "@/utils/cards";
import { useBreakpoint, usePrevious } from "@/utils/hooks";

const scrollToButtonDelay = 750;

interface SnapContainerProps {
  children: ReactNode;
}

const SnapContainer = forwardRef<HTMLElement, SnapContainerProps>(
  ({ children }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexShrink: 0,
        justifyContent: "center",
        p: 2,
        minWidth: { xs: "100vw", sm: 0 },
        scrollSnapAlign: "start",
      }}
    >
      {children}
    </Box>
  ),
);
SnapContainer.displayName = "SnapContainer";

export type WoodyPlantStackSize = "sm" | "md" | "lg";

interface WoodyPlantStackProps {
  game: Game;
  woodyPlants: WoodyPlantCard[];
  size?: WoodyPlantStackSize;
  onAddDweller?: (woodyPlantId: string, position: DwellerPosition) => void;
  onAddWoodyPlant?: () => void;
  onDwellerClick?: (woodyPlant: WoodyPlantCard, dweller: DwellerCard) => void;
  onWoodyPlantClick?: (WoodyPlantStackProps: WoodyPlantCard) => void;
}

const WoodyPlantStack = ({
  game,
  woodyPlants,
  size = "md",
  onAddDweller,
  onAddWoodyPlant,
  onDwellerClick,
  onWoodyPlantClick,
}: WoodyPlantStackProps) => {
  const woodyPlantSlotRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const addButtonRef = useRef<HTMLElement>(null);

  const prevWoodyPlants = usePrevious(woodyPlants);

  const isScreenXs = useBreakpoint((breakpoints) => breakpoints.only("xs"));

  // Clear orphaned refs
  useEffect(() => {
    const woodyPlantIds = woodyPlants.map((w) => w.id);
    woodyPlantSlotRefs.current = _.pick(
      woodyPlantSlotRefs.current,
      woodyPlantIds,
    );
  }, [woodyPlants]);

  // Scroll to new woody plant after adding it
  useEffect(() => {
    if (
      !woodyPlants ||
      !prevWoodyPlants ||
      woodyPlants.length <= prevWoodyPlants.length
    )
      return;

    const newWoodyPlant = woodyPlants.find((t1) =>
      prevWoodyPlants.every((t2) => t1.id !== t2.id),
    );
    if (newWoodyPlant) {
      woodyPlantSlotRefs.current[newWoodyPlant.id]?.scrollIntoView({
        behavior: isScreenXs ? "instant" : "smooth",
        inline: "center",
      });
    }
  }, [isScreenXs, woodyPlants, prevWoodyPlants]);

  // Scroll to add button after adding the final dweller to the last wood plant
  useEffect(() => {
    const lastWoodyPlant = woodyPlants.at(-1);
    const prevLastWoodyPlant = prevWoodyPlants?.at(-1);
    if (
      !lastWoodyPlant ||
      lastWoodyPlant === prevLastWoodyPlant ||
      lastWoodyPlant?.id !== prevLastWoodyPlant?.id
    )
      return;

    const wasDwellerAdded =
      getDwellersOfWoodyPlant(lastWoodyPlant).length >
      getDwellersOfWoodyPlant(prevLastWoodyPlant).length;
    const canAddDwellers =
      getDwellerCandidates(game, lastWoodyPlant.id).length > 0;

    if (wasDwellerAdded && !canAddDwellers) {
      const handle = setTimeout(() => {
        addButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }, scrollToButtonDelay);

      return () => clearTimeout(handle);
    }
  }, [game, woodyPlants, prevWoodyPlants]);

  return (
    <Stack direction="row" alignItems="center" gap={4}>
      {woodyPlants.map((woodyPlant) => (
        <SnapContainer
          key={woodyPlant.id}
          ref={(ref) => (woodyPlantSlotRefs.current[woodyPlant.id] = ref)}
        >
          <WoodyPlantSlot
            game={game}
            woodyPlant={woodyPlant}
            size={size}
            onAddDweller={(position) => onAddDweller?.(woodyPlant.id, position)}
            onDwellerClick={(dweller) => onDwellerClick?.(woodyPlant, dweller)}
            onWoodyPlantClick={() => onWoodyPlantClick?.(woodyPlant)}
          />
        </SnapContainer>
      ))}

      <SnapContainer key="add" ref={addButtonRef}>
        <AddTreeTooltip placement="bottom">
          <AddCardButton
            size={size}
            sx={{
              flexShrink: 0,
              height: CARD_HEIGHT[size],
              width: CARD_WIDTH[size],
            }}
            onClick={onAddWoodyPlant}
          />
        </AddTreeTooltip>
      </SnapContainer>
    </Stack>
  );
};

export default WoodyPlantStack;
