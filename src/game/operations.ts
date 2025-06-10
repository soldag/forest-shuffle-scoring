import { produce } from "immer";

import {
  Cave,
  DwellerCard,
  DwellerPosition,
  Forest,
  Game,
  Player,
  WoodyPlantCard,
  getDwellersOfWoodyPlant,
} from "@/game";

const requirePlayer = (game: Game, playerId: string): Player => {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    throw new Error(`Player with ID ${playerId} was not found`);
  }

  return player;
};

const findWoodyPlant = (
  game: Game,
  woodyPlantId: string,
):
  | { forest: Forest; woodyPlant: WoodyPlantCard; index: number }
  | Record<string, never> => {
  for (const { forest } of game.players) {
    const index = forest.woodyPlants.findIndex((w) => w.id === woodyPlantId);
    if (index >= 0) {
      const woodyPlant = forest.woodyPlants[index];
      return { forest, woodyPlant, index };
    }
  }

  return {};
};

const findDweller = (
  game: Game,
  dwellerId: string,
):
  | {
      forest: Forest;
      woodyPlant: WoodyPlantCard;
      dweller: DwellerCard;
      index: number;
    }
  | Record<string, never> => {
  for (const { forest } of game.players) {
    for (const woodyPlant of forest.woodyPlants) {
      for (const dwellers of Object.values(woodyPlant.dwellers)) {
        const index = dwellers.findIndex((d) => d.id === dwellerId);
        if (index >= 0) {
          const dweller = dwellers[index];
          return { forest, woodyPlant, dweller, index };
        }
      }
    }
  }

  return {};
};

const clearCave = (cave: Cave): Cave => ({
  ...cave,
  cardCount: 0,
});

const clearWoodyPlant = (woodyPlant: WoodyPlantCard): WoodyPlantCard => ({
  ...woodyPlant,
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

    draft.deck.caves = draft.deck.caves.filter(
      (c) => c.id !== player.forest.cave.id,
    );
  });

export const removePlayer = (game: Game, playerId: string) => {
  const player = requirePlayer(game, playerId);
  return produce(
    player.forest.woodyPlants.reduce(
      (game, woodyPlant) => removeWoodyPlant(game, woodyPlant.id),
      game,
    ),
    (draft) => {
      draft.players = draft.players.filter((p) => p.id !== playerId);

      draft.deck.caves.push(clearCave(player.forest.cave));
    },
  );
};

export const setCave = (game: Game, playerId: string, cave: Cave) =>
  produce(game, (draft) => {
    const player = requirePlayer(draft, playerId);

    draft.deck.caves.push(clearCave(player.forest.cave));
    player.forest.cave = cave;
    draft.deck.caves = draft.deck.caves.filter((c) => c.id !== cave.id);
  });

export const playWoodyPlant = (
  game: Game,
  playerId: string,
  woodyPlant: WoodyPlantCard,
): Game =>
  produce(game, (draft) => {
    const player = requirePlayer(draft, playerId);
    player.forest.woodyPlants.push(woodyPlant);

    if (woodyPlant.isPartOfDeck) {
      draft.deck.woodyPlants = draft.deck.woodyPlants.filter(
        (wp) => wp.id !== woodyPlant.id,
      );
    }
  });

export const playDweller = (
  game: Game,
  playerId: string,
  woodyPlantId: string,
  dweller: DwellerCard,
) =>
  produce(game, (draft) => {
    const player = requirePlayer(draft, playerId);
    const woodyPlant = player.forest.woodyPlants.find(
      (wp) => wp.id === woodyPlantId,
    );
    if (!woodyPlant) {
      throw new Error(
        `Woody plant with ID ${woodyPlantId} was not found in forest`,
      );
    }

    woodyPlant.dwellers[dweller.position].push(dweller);

    if (dweller.isPartOfDeck) {
      draft.deck.dwellers = draft.deck.dwellers.filter(
        (d) => d.id !== dweller.id,
      );
    }
  });

export const exchangeWoodyPlant = (
  game: Game,
  oldWoodyPlantId: string,
  newWoodyPlant: WoodyPlantCard,
) =>
  produce(game, (draft) => {
    const {
      forest,
      woodyPlant: oldWoodyPlant,
      index,
    } = findWoodyPlant(draft, oldWoodyPlantId);
    if (!oldWoodyPlant) {
      throw new Error(`Woody plant with ID ${oldWoodyPlantId} was not found`);
    }

    forest.woodyPlants[index] = {
      ...newWoodyPlant,
      dwellers: oldWoodyPlant.dwellers,
    };

    if (oldWoodyPlant.isPartOfDeck) {
      draft.deck.woodyPlants.push(clearWoodyPlant(oldWoodyPlant));
    }
    if (newWoodyPlant.isPartOfDeck) {
      draft.deck.woodyPlants = draft.deck.woodyPlants.filter(
        (w) => w.id !== newWoodyPlant.id,
      );
    }
  });

export const exchangeDweller = (
  game: Game,
  oldDwellerId: string,
  newDweller: DwellerCard,
) =>
  produce(game, (draft) => {
    const {
      woodyPlant,
      dweller: oldDweller,
      index,
    } = findDweller(draft, oldDwellerId);
    if (!oldDweller) {
      throw new Error(`Dweller with ID ${oldDwellerId} was not found`);
    }

    woodyPlant.dwellers[oldDweller.position][index] = newDweller;

    if (oldDweller.isPartOfDeck) {
      draft.deck.dwellers.push(oldDweller);
    }
    if (newDweller.isPartOfDeck) {
      draft.deck.dwellers = draft.deck.dwellers.filter(
        (d) => d.id !== newDweller.id,
      );
    }
  });

export const removeWoodyPlant = (game: Game, woodyPlantId: string) =>
  produce(game, (draft) => {
    const { forest, woodyPlant } = findWoodyPlant(draft, woodyPlantId);
    if (!woodyPlant) {
      throw new Error(`Woody plant with ID ${woodyPlantId} was not found`);
    }

    forest.woodyPlants = forest.woodyPlants.filter(
      (w) => w.id !== woodyPlantId,
    );

    if (woodyPlant.isPartOfDeck) {
      draft.deck.woodyPlants.push(clearWoodyPlant(woodyPlant));
    }
    draft.deck.dwellers.push(
      ...getDwellersOfWoodyPlant(woodyPlant).filter((d) => d.isPartOfDeck),
    );
  });

export const removeDweller = (game: Game, dwellerId: string) =>
  produce(game, (draft) => {
    const { woodyPlant, dweller } = findDweller(draft, dwellerId);
    if (!dweller) {
      throw new Error(`Dweller with ID ${dwellerId} was not found`);
    }

    const { dwellers } = woodyPlant;
    dwellers[dweller.position] = dwellers[dweller.position].filter(
      (d) => d.id !== dweller.id,
    );

    if (dweller.isPartOfDeck) {
      draft.deck.dwellers.push(dweller);
    }
  });
