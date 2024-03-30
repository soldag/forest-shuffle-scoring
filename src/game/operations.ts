import { produce } from "immer";

import {
  DwellerCard,
  DwellerPosition,
  Forest,
  Game,
  Player,
  TreeCard,
  getDwellersOfTree,
} from "@/game";

const requirePlayer = (game: Game, playerId: string): Player => {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    throw new Error(`Player with ID ${playerId} was not found`);
  }

  return player;
};

const findTree = (
  game: Game,
  treeId: string,
):
  | { forest: Forest; tree: TreeCard; index: number }
  | Record<string, never> => {
  for (const { forest } of game.players) {
    const index = forest.trees.findIndex((t) => t.id === treeId);
    if (index >= 0) {
      const tree = forest.trees[index];
      return { forest, tree, index };
    }
  }

  return {};
};

const findDweller = (
  game: Game,
  dwellerId: string,
):
  | { forest: Forest; tree: TreeCard; dweller: DwellerCard; index: number }
  | Record<string, never> => {
  for (const { forest } of game.players) {
    for (const tree of forest.trees) {
      for (const dwellers of Object.values(tree.dwellers)) {
        const index = dwellers.findIndex((d) => d.id === dwellerId);
        if (index >= 0) {
          const dweller = dwellers[index];
          return { forest, tree, dweller, index };
        }
      }
    }
  }

  return {};
};

const clearTree = (tree: TreeCard): TreeCard => ({
  ...tree,
  dwellers: {
    [DwellerPosition.Top]: [],
    [DwellerPosition.Bottom]: [],
    [DwellerPosition.Left]: [],
    [DwellerPosition.Right]: [],
  },
});

export const addPlayer = (game: Game, player: Player) =>
  produce(game, (draft) => {
    if (draft.players.some((p) => p.id === player.id)) {
      throw new Error("A player with this ID already exists");
    }

    draft.players.push(player);
  });

export const removePlayer = (game: Game, playerId: string) => {
  const player = requirePlayer(game, playerId);
  return produce(
    player.forest.trees.reduce((game, tree) => removeTree(game, tree.id), game),
    (draft) => {
      draft.players = draft.players.filter((p) => p.id !== playerId);
    },
  );
};

export const setCaveCardCount = (game: Game, playerId: string, count: number) =>
  produce(game, (draft) => {
    const player = requirePlayer(draft, playerId);
    player.forest.caveCardCount = count;
  });

export const playTree = (game: Game, playerId: string, tree: TreeCard): Game =>
  produce(game, (draft) => {
    const player = requirePlayer(draft, playerId);
    player.forest.trees.push(tree);

    if (tree.isPartOfDeck) {
      draft.deck.trees = draft.deck.trees.filter((t) => t.id !== tree.id);
    }
  });

export const playDweller = (
  game: Game,
  playerId: string,
  treeId: string,
  dweller: DwellerCard,
) =>
  produce(game, (draft) => {
    const player = requirePlayer(draft, playerId);
    const tree = player.forest.trees.find((t) => t.id === treeId);
    if (!tree) {
      throw new Error(`Tree with ID ${treeId} was not found in forest`);
    }

    tree.dwellers[dweller.position].push(dweller);

    if (dweller.isPartOfDeck) {
      draft.deck.dwellers = draft.deck.dwellers.filter(
        (d) => d.id !== dweller.id,
      );
    }
  });

export const exchangeTree = (
  game: Game,
  oldTreeId: string,
  newTree: TreeCard,
) =>
  produce(game, (draft) => {
    const { forest, tree: oldTree, index } = findTree(draft, oldTreeId);
    if (!oldTree) {
      throw new Error(`Tree with ID ${oldTreeId} was not found`);
    }

    forest.trees[index] = {
      ...newTree,
      dwellers: oldTree.dwellers,
    };

    if (oldTree.isPartOfDeck) {
      draft.deck.trees.push(clearTree(oldTree));
    }
    if (newTree.isPartOfDeck) {
      draft.deck.trees = draft.deck.trees.filter((t) => t.id !== newTree.id);
    }
  });

export const exchangeDweller = (
  game: Game,
  oldDwellerId: string,
  newDweller: DwellerCard,
) =>
  produce(game, (draft) => {
    const {
      tree,
      dweller: oldDweller,
      index,
    } = findDweller(draft, oldDwellerId);
    if (!oldDweller) {
      throw new Error(`Dweller with ID ${oldDwellerId} was not found`);
    }

    tree.dwellers[oldDweller.position][index] = newDweller;

    if (oldDweller.isPartOfDeck) {
      draft.deck.dwellers.push(oldDweller);
    }
    if (newDweller.isPartOfDeck) {
      draft.deck.dwellers = draft.deck.dwellers.filter(
        (d) => d.id !== newDweller.id,
      );
    }
  });

export const removeTree = (game: Game, treeId: string) =>
  produce(game, (draft) => {
    const { forest, tree } = findTree(draft, treeId);
    if (!tree) {
      throw new Error(`Tree with ID ${treeId} was not found`);
    }

    forest.trees = forest.trees.filter((t) => t.id !== treeId);

    if (tree.isPartOfDeck) {
      draft.deck.trees.push(clearTree(tree));
    }
    draft.deck.dwellers.push(
      ...getDwellersOfTree(tree).filter((d) => d.isPartOfDeck),
    );
  });

export const removeDweller = (game: Game, dwellerId: string) =>
  produce(game, (draft) => {
    const { tree, dweller } = findDweller(draft, dwellerId);
    if (!dweller) {
      throw new Error(`Dweller with ID ${dwellerId} was not found`);
    }

    tree.dwellers[dweller.position] = tree.dwellers[dweller.position].filter(
      (d) => d.id !== dweller.id,
    );

    if (dweller.isPartOfDeck) {
      draft.deck.dwellers.push(dweller);
    }
  });
