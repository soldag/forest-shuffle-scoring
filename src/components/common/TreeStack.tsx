import * as _ from "lodash-es";
import { ReactNode, forwardRef, useEffect, useRef } from "react";

import { Box, Stack } from "@mui/joy";

import AddCardButton from "@/components/common/AddCardButton";
import TreeSlot from "@/components/common/TreeSlot";
import AddTreeTooltip from "@/components/common/tutorial/AddTreeTooltip";
import {
  DwellerCard,
  DwellerPosition,
  Game,
  TreeCard,
  getDwellerCandidates,
  getDwellersOfTree,
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

export type TreeStackSize = "sm" | "md" | "lg";

interface TreeStackProps {
  game: Game;
  trees: TreeCard[];
  size?: TreeStackSize;
  onAddDweller?: (treeId: string, position: DwellerPosition) => void;
  onAddTree?: () => void;
  onDwellerClick?: (tree: TreeCard, dweller: DwellerCard) => void;
  onTreeClick?: (TreeStackProps: TreeCard) => void;
}

const TreeStack = ({
  game,
  trees,
  size = "md",
  onAddDweller,
  onAddTree,
  onDwellerClick,
  onTreeClick,
}: TreeStackProps) => {
  const treeSlotRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const addButtonRef = useRef<HTMLElement>(null);

  const prevTrees = usePrevious(trees);

  const isScreenXs = useBreakpoint((breakpoints) => breakpoints.only("xs"));

  // Clear orphaned refs
  useEffect(() => {
    const treeIds = trees.map((t) => t.id);
    treeSlotRefs.current = _.pick(treeSlotRefs.current, treeIds);
  }, [trees]);

  // Scroll to new tree after adding it
  useEffect(() => {
    if (!trees || !prevTrees || trees.length <= prevTrees.length) return;

    const newTree = trees.find((t1) =>
      prevTrees.every((t2) => t1.id !== t2.id),
    );
    if (newTree) {
      treeSlotRefs.current[newTree.id]?.scrollIntoView({
        behavior: isScreenXs ? "instant" : "smooth",
        inline: "center",
      });
    }
  }, [isScreenXs, trees, prevTrees]);

  // Scroll to add button after adding the final dweller to the last tree
  useEffect(() => {
    const lastTree = trees.at(-1);
    const prevLastTree = prevTrees?.at(-1);
    if (
      !lastTree ||
      lastTree === prevLastTree ||
      lastTree?.id !== prevLastTree?.id
    )
      return;

    const wasDwellerAdded =
      getDwellersOfTree(lastTree).length >
      getDwellersOfTree(prevLastTree).length;
    const canAddDwellers = getDwellerCandidates(game, lastTree.id).length > 0;

    if (wasDwellerAdded && !canAddDwellers) {
      const handle = setTimeout(() => {
        addButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }, scrollToButtonDelay);

      return () => clearTimeout(handle);
    }
  }, [game, trees, prevTrees]);

  return (
    <Stack direction="row" alignItems="center" gap={4}>
      {trees.map((tree) => (
        <SnapContainer
          key={tree.id}
          ref={(ref) => (treeSlotRefs.current[tree.id] = ref)}
        >
          <TreeSlot
            game={game}
            tree={tree}
            size={size}
            onAddDweller={(position) => onAddDweller?.(tree.id, position)}
            onDwellerClick={(dweller) => onDwellerClick?.(tree, dweller)}
            onTreeClick={() => onTreeClick?.(tree)}
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
            onClick={onAddTree}
          />
        </AddTreeTooltip>
      </SnapContainer>
    </Stack>
  );
};

export default TreeStack;
