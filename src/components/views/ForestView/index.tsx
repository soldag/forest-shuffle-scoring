import React, { useContext, useMemo, useState } from "react";

import { Box } from "@mui/joy";

import {
  exchangeDweller,
  exchangeTree,
  playDweller,
  playTree,
  removeDweller,
  removeTree,
} from "@/components/actions/game";
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

import Footer from "./components/Footer";
import Header from "./components/Header";

const ForestView: React.FC = () => {
  const { game, playerId, dispatch } = useContext(GameContext);

  const [isAddingTree, setIsAddingTree] = useState(false);
  const [selectedTree, setSelectedTree] = useState<TreeCard | null>(null);

  const [isAddingDweller, setIsAddingDweller] = useState(false);
  const [dwellerTreeId, setDwellerTreeId] = useState<string | null>();
  const [dwellerPosition, setDwellerPosition] =
    useState<DwellerPosition | null>();
  const [selectedDweller, setSelectedDweller] = useState<DwellerCard | null>();

  const forest = game?.players?.find((p) => p.id === playerId)?.forest;
  const treeOptions = useMemo(
    () => [
      ...(selectedTree ? [selectedTree] : []),
      ...(game ? getTreeCandidates(game) : []),
    ],
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
    <View header={<Header />} footer={<Footer />}>
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
            p: 2,
            overflowY: "auto",
          }}
        >
          <TreeStack
            game={game!}
            trees={forest?.trees || []}
            onAddTree={handleAddTree}
            onAddDweller={handleAddDweller}
            onTreeClick={handleTreeClick}
            onDwellerClick={handleDwellerClick}
          />
          <CardDrawer
            open={isAddingTree || !!selectedTree}
            onClose={handleCloseTreeDrawer}
            cards={treeOptions}
            selectedCard={selectedTree}
            onSelectCard={handleSelectTree}
            onRemoveCard={handleRemoveTree}
          />
          <CardDrawer
            open={isAddingDweller || !!selectedDweller}
            onClose={handleCloseDwellerDrawer}
            cards={dwellerOptions}
            selectedCard={selectedDweller}
            onSelectCard={handleSelectDweller}
            onRemoveCard={handleRemoveDweller}
          />
        </Box>
      </Box>
    </View>
  );
};
export default ForestView;
