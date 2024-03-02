import React from "react";

import { Box, Stack } from "@mui/joy";

import DwellerSlot from "@/components/common/DwellerSlot";
import TreeCard from "@/components/common/TreeCard";
import {
  DwellerCard as DwellerCardType,
  DwellerPosition,
  Game,
  TreeCard as TreeCardType,
} from "@/game";

interface TreeSlotProps {
  game: Game;
  tree: TreeCardType;
  onAddDweller?: (position: DwellerPosition) => void;
  onDwellerClick?: (dweller: DwellerCardType) => void;
  onTreeClick?: () => void;
}

const TreeSlot: React.FC<TreeSlotProps> = ({
  game,
  tree,
  onAddDweller,
  onDwellerClick,
  onTreeClick,
}) => {
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
          tree={tree}
          position={DwellerPosition.Top}
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
          tree={tree}
          position={DwellerPosition.Left}
          onAdd={() => onAddDweller?.(DwellerPosition.Left)}
          onDwellerClick={onDwellerClick}
        />
      </Stack>

      <TreeCard card={tree} sx={{ zIndex: 3 }} onClick={onTreeClick} />

      <Stack direction="row" justifyContent="flex-start" sx={{ zIndex: 2 }}>
        <DwellerSlot
          game={game}
          tree={tree}
          position={DwellerPosition.Right}
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
          tree={tree}
          position={DwellerPosition.Bottom}
          onAdd={() => onAddDweller?.(DwellerPosition.Bottom)}
          onDwellerClick={onDwellerClick}
        />
      </Stack>
    </Box>
  );
};

export default TreeSlot;
