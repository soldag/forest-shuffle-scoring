import { Box, Stack } from "@mui/joy";

import DwellerSlot from "@/components/common/DwellerSlot";
import WoodyPlantCard from "@/components/common/WoodyPlantCard";
import {
  DwellerCard as DwellerCardType,
  DwellerPosition,
  Game,
  WoodyPlantCard as WoodyPlantCardType,
} from "@/game";

export type WoodyPlantSlotSize = "sm" | "md" | "lg";

interface WoodyPlantSlotProps {
  game: Game;
  woodyPlant: WoodyPlantCardType;
  size?: WoodyPlantSlotSize;
  onAddDweller?: (position: DwellerPosition) => void;
  onDwellerClick?: (dweller: DwellerCardType) => void;
  onWoodyPlantClick?: () => void;
}

const WoodyPlantSlot = ({
  game,
  woodyPlant,
  size = "md",
  onAddDweller,
  onDwellerClick,
  onWoodyPlantClick,
}: WoodyPlantSlotProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto auto auto"
      gridTemplateRows="1fr auto 1fr"
    >
      <Stack
        direction="column"
        justifyContent="flex-end"
        sx={{ gridColumnStart: 2 }}
      >
        <DwellerSlot
          game={game}
          woodyPlant={woodyPlant}
          position={DwellerPosition.Top}
          size={size}
          onAdd={() => onAddDweller?.(DwellerPosition.Top)}
          onDwellerClick={onDwellerClick}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ gridColumnStart: 1, zIndex: 2 }}
      >
        <DwellerSlot
          game={game}
          woodyPlant={woodyPlant}
          position={DwellerPosition.Left}
          size={size}
          onAdd={() => onAddDweller?.(DwellerPosition.Left)}
          onDwellerClick={onDwellerClick}
        />
      </Stack>

      <WoodyPlantCard
        card={woodyPlant}
        size={size}
        sx={{ zIndex: 3 }}
        onClick={onWoodyPlantClick}
      />

      <Stack direction="row" justifyContent="flex-start" sx={{ zIndex: 2 }}>
        <DwellerSlot
          game={game}
          woodyPlant={woodyPlant}
          position={DwellerPosition.Right}
          size={size}
          onAdd={() => onAddDweller?.(DwellerPosition.Right)}
          onDwellerClick={onDwellerClick}
        />
      </Stack>

      <Stack
        direction="column"
        justifyContent="flex-start"
        sx={{ gridColumnStart: 2 }}
      >
        <DwellerSlot
          game={game}
          woodyPlant={woodyPlant}
          position={DwellerPosition.Bottom}
          size={size}
          onAdd={() => onAddDweller?.(DwellerPosition.Bottom)}
          onDwellerClick={onDwellerClick}
        />
      </Stack>
    </Box>
  );
};

export default WoodyPlantSlot;
