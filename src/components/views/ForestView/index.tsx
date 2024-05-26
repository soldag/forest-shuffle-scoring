import React, { useContext, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Box } from "@mui/joy";

import {
  exchangeDweller,
  exchangeTree,
  playDweller,
  playTree,
  removeDweller,
  removeTree,
} from "@/actions/game";
import CardDrawer from "@/components/common/CardDrawer";
import TreeStack from "@/components/common/TreeStack";
import View from "@/components/common/View";
import GameContext from "@/components/contexts/GameContext";
import {
  DwellerCard,
  DwellerPosition,
  TreeCard,
  getDwellerCandidates,
  getTreeCandidates,
} from "@/game";
import { requireGame } from "@/utils/hoc";

import Footer from "./components/Footer";
import Header from "./components/Header";

const useResponsiveSize = () => {
  const isLg = useMediaQuery("(min-height: 900px)");
  const isMd = useMediaQuery("(min-height: 800px)");

  if (isLg) {
    return "lg";
  } else if (isMd) {
    return "md";
  } else {
    return "sm";
  }
};

const ForestView: React.FC = requireGame(({ game }) => {
  const { playerId, dispatch } = useContext(GameContext);

  const [isAddingTree, setIsAddingTree] = useState(false);
  const [selectedTree, setSelectedTree] = useState<TreeCard | null>(null);

  const [isAddingDweller, setIsAddingDweller] = useState(false);
  const [dwellerTreeId, setDwellerTreeId] = useState<string | null>();
  const [dwellerPosition, setDwellerPosition] =
    useState<DwellerPosition | null>();
  const [selectedDweller, setSelectedDweller] = useState<DwellerCard | null>();

  const forest = game.players.find((p) => p.id === playerId)?.forest;
  const treeOptions = useMemo(
    () => [...getTreeCandidates(game), ...(selectedTree ? [selectedTree] : [])],
    [game, selectedTree],
  );
  const dwellerOptions = useMemo(
    () => [
      ...(selectedDweller ? [selectedDweller] : []),
      ...(game && dwellerTreeId && dwellerPosition
        ? getDwellerCandidates(
            game,
            dwellerTreeId,
            dwellerPosition,
            selectedDweller,
          )
        : []),
    ],
    [game, dwellerTreeId, dwellerPosition, selectedDweller],
  );

  const treeStackSize = useResponsiveSize();

  const handleAddTree = () => {
    setIsAddingTree(true);
  };

  const handleSelectTree = (tree: TreeCard) => {
    if (!playerId) return;
    if (isAddingTree) {
      setIsAddingTree(false);
      dispatch(playTree({ playerId, tree }));
    } else if (selectedTree) {
      setSelectedTree(null);
      dispatch(
        exchangeTree({ playerId, oldTreeId: selectedTree.id, newTree: tree }),
      );
    }
  };

  const handleRemoveTree = () => {
    if (selectedTree && playerId) {
      setSelectedTree(null);
      dispatch(removeTree({ playerId, treeId: selectedTree.id }));
    }
  };

  const handleTreeClick = (tree: TreeCard) => {
    setSelectedTree(tree);
  };

  const handleCloseTreeDrawer = () => {
    setIsAddingTree(false);
    setSelectedTree(null);
  };

  const handleAddDweller = (treeId: string, position: DwellerPosition) => {
    setIsAddingDweller(true);
    setDwellerTreeId(treeId);
    setDwellerPosition(position);
  };

  const handleSelectDweller = (dweller: DwellerCard) => {
    if (!playerId) return;

    if (isAddingDweller && dwellerTreeId) {
      setIsAddingDweller(false);
      dispatch(playDweller({ playerId, treeId: dwellerTreeId, dweller }));
    } else if (selectedDweller) {
      setSelectedDweller(null);
      dispatch(
        exchangeDweller({
          playerId,
          oldDwellerId: selectedDweller.id,
          newDweller: dweller,
        }),
      );
    }

    setDwellerTreeId(null);
    setDwellerPosition(null);
  };

  const handleRemoveDweller = () => {
    if (selectedDweller && playerId) {
      setSelectedDweller(null);
      dispatch(removeDweller({ playerId, dwellerId: selectedDweller.id }));
    }
  };

  const handleDwellerClick = (tree: TreeCard, dweller: DwellerCard) => {
    setDwellerTreeId(tree.id);
    setDwellerPosition(dweller.position);
    setSelectedDweller(dweller);
  };

  const handleCloseDwellerDrawer = () => {
    setIsAddingDweller(false);
    setSelectedDweller(null);
    setDwellerTreeId(null);
    setDwellerPosition(null);
  };

  return (
    <View disableGutters header={<Header />} footer={<Footer />}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            scrollSnapType: { xs: "x mandatory", sm: "none" },
          }}
        >
          <TreeStack
            game={game!}
            trees={forest?.trees || []}
            size={treeStackSize}
            onAddTree={handleAddTree}
            onAddDweller={handleAddDweller}
            onTreeClick={handleTreeClick}
            onDwellerClick={handleDwellerClick}
          />
        </Box>
      </Box>

      <CardDrawer
        action={isAddingTree ? "add" : "exchange"}
        open={isAddingTree || !!selectedTree}
        onClose={handleCloseTreeDrawer}
        cards={treeOptions}
        selectedCard={selectedTree}
        onSelectCard={handleSelectTree}
        onRemoveCard={handleRemoveTree}
      />
      <CardDrawer
        action={isAddingDweller ? "add" : "exchange"}
        open={isAddingDweller || !!selectedDweller}
        onClose={handleCloseDwellerDrawer}
        cards={dwellerOptions}
        selectedCard={selectedDweller}
        onSelectCard={handleSelectDweller}
        onRemoveCard={handleRemoveDweller}
      />
    </View>
  );
});

export default ForestView;
