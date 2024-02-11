import React from "react";

import { Stack } from "@mui/joy";

import { DwellerCard, DwellerPosition, Game, TreeCard } from "@/cards";
import AddTreeButton from "@/components/common/AddTreeButton";
import TreeSlot from "@/components/common/TreeSlot";

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
    <Stack direction="row" alignItems="center" gap={5}>
      {trees.map((tree) => (
        <TreeSlot
          key={tree.id}
          game={game}
          tree={tree}
          onAddDweller={(position) => onAddDweller?.(tree.id, position)}
          onDwellerClick={(dweller) => onDwellerClick?.(tree, dweller)}
          onTreeClick={() => onTreeClick?.(tree)}
        />
      ))}

      <AddTreeButton onClick={onAddTree} sx={{ flexShrink: 0 }} />
    </Stack>
  );
};

export default TreeStack;
