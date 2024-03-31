import React, { ReactNode } from "react";

import { Box, Stack } from "@mui/joy";

import AddTreeButton from "@/components/common/AddTreeButton";
import TreeSlot from "@/components/common/TreeSlot";
import { DwellerCard, DwellerPosition, Game, TreeCard } from "@/game";

interface SnapContainerProps {
  children: ReactNode;
}

const SnapContainer: React.FC<SnapContainerProps> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      p: 2,
      minWidth: { xs: "100vw", sm: 0 },
      scrollSnapAlign: "start",
    }}
  >
    {children}
  </Box>
);

interface TreeStackProps {
  game: Game;
  trees: TreeCard[];
  onAddDweller?: (treeId: string, position: DwellerPosition) => void;
  onAddTree?: () => void;
  onDwellerClick?: (tree: TreeCard, dweller: DwellerCard) => void;
  onTreeClick?: (TreeStackProps: TreeCard) => void;
}

const TreeStack: React.FC<TreeStackProps> = ({
  game,
  trees,
  onAddDweller,
  onAddTree,
  onDwellerClick,
  onTreeClick,
}) => {
  return (
    <Stack direction="row" alignItems="center" gap={4}>
      {trees.map((tree) => (
        <SnapContainer key={tree.id}>
          <TreeSlot
            game={game}
            tree={tree}
            onAddDweller={(position) => onAddDweller?.(tree.id, position)}
            onDwellerClick={(dweller) => onDwellerClick?.(tree, dweller)}
            onTreeClick={() => onTreeClick?.(tree)}
          />
        </SnapContainer>
      ))}

      <SnapContainer key="add">
        <AddTreeButton onClick={onAddTree} sx={{ flexShrink: 0 }} />
      </SnapContainer>
    </Stack>
  );
};

export default TreeStack;
