import { produce } from "immer";

import { createDeck, createPlayer, createWoodyPlant } from "@/game/factory";
import { decode } from "@/game/sharing/encoding";
import { GameDtoSchema, PlayerExportDtoSchema } from "@/game/sharing/schemas";
import {
  CaveDto,
  DwellerCardDto,
  GameDto,
  PlayerDto,
  PlayerExportDto,
  WoodyPlantCardDto,
} from "@/game/sharing/types";
import {
  Cave,
  Deck,
  DwellerCard,
  Game,
  Player,
  WoodyPlantCard,
} from "@/game/types";
import * as WoodyPlants from "@/game/woody-plants";
import { ScoringMode } from "@/types";

export enum ImportErrorType {
  InvalidData = "INVALID_DATA",
  InvalidSchema = "INVALID_SCHEMA",
  AppVersionMismatch = "APP_VERSION_MISMATCH",
  GameBoxesMismatch = "GAME_BOXES_MISMATCH",
  UnavailableCards = "UNAVAILABLE_CARDS",
}

export interface SuccessGameImportResult {
  success: true;
  scoringMode: ScoringMode;
  game: Game;
}

export interface ErrorGameImportResult {
  success: false;
  error: ImportErrorType;
  unavailableCards?: {
    cave: CaveDto | null;
    dwellers: DwellerCardDto[];
    woodyPlants: WoodyPlantCardDto[];
  };
}

export type GameImportResult = SuccessGameImportResult | ErrorGameImportResult;

export const importGame = (): GameImportResult => {
  let decodedData = JSON.parse(localStorage.getItem("game") ?? "");

  let exportDto: GameDto;
  try {
    exportDto = GameDtoSchema.parse(decodedData);
  } catch (e) {
    console.error("Failed to parse game state", e);
    return createGameErrorResult(ImportErrorType.InvalidData);
  }

  if (exportDto.appVersion !== import.meta.env.PACKAGE_VERSION) {
    return createGameErrorResult(ImportErrorType.AppVersionMismatch);
  }

  const game: Game = {
    id: exportDto.id,
    gameBoxes: exportDto.gameBoxes,
    deck: createDeck(exportDto.gameBoxes),
    players: [],
  };

  for (const player of exportDto.players) {
    const playerImportResult = importPlayerData(game, player);

    if (playerImportResult.success) {
      game.players.push(playerImportResult.player);
    } else {
      return createGameErrorResult(
        playerImportResult.error,
        playerImportResult.unavailableCards,
      );
    }
  }

  return createGameSuccessResult(exportDto.scoringMode, game);
};

const createGameErrorResult = (
  error: ImportErrorType,
  unavailableCards?: ErrorGameImportResult["unavailableCards"],
): ErrorGameImportResult => ({
  success: false,
  error,
  unavailableCards,
});

const createGameSuccessResult = (
  scoringMode: ScoringMode,
  game: Game,
): SuccessGameImportResult => ({
  success: true,
  scoringMode,
  game,
});

export interface SuccessPlayerImportResult {
  success: true;
  player: Player;
}

export interface ErrorPlayerImportResult {
  success: false;
  error: ImportErrorType;
  unavailableCards?: {
    cave: CaveDto | null;
    dwellers: DwellerCardDto[];
    woodyPlants: WoodyPlantCardDto[];
  };
}

export type PlayerImportResult =
  | SuccessPlayerImportResult
  | ErrorPlayerImportResult;

export const importPlayer = (
  game: Game,
  encodedData: string,
): PlayerImportResult => {
  let decodedData;
  try {
    decodedData = decode(encodedData);
  } catch (e) {
    console.error("Failed to decode exported player", e);
    return createErrorResult(ImportErrorType.InvalidData);
  }

  let exportDto: PlayerExportDto;
  try {
    exportDto = PlayerExportDtoSchema.parse(decodedData);
  } catch (e) {
    console.error("Failed to parse exported player", e);
    return createErrorResult(ImportErrorType.InvalidSchema);
  }

  const {
    appVersion,
    gameBoxes,
    player: { name, forest },
  } = exportDto;

  if (appVersion !== import.meta.env.PACKAGE_VERSION) {
    return createErrorResult(ImportErrorType.AppVersionMismatch);
  }

  if (!gameBoxes.every((gb) => game.gameBoxes.includes(gb))) {
    return createErrorResult(ImportErrorType.GameBoxesMismatch);
  }

  return importPlayerData(game, {
    name,
    forest,
  });
};

const importPlayerData = (
  game: Game,
  exportDto: PlayerDto,
): PlayerImportResult => {
  const {
    name,
    forest: { cave: caveDto, woodyPlants: woodyPlantDtos },
  } = exportDto;

  const cave = findCaveOfDto(game.deck, caveDto);

  const woodyPlants: WoodyPlantCard[] = [];
  const dwellers: DwellerCard[] = [];
  const unavailableDwellers: DwellerCardDto[] = [];
  const unavailableWoodyPlants: WoodyPlantCardDto[] = [];

  for (const woodyPlantDto of woodyPlantDtos) {
    let woodyPlant = findWoodyPlantOfDto(game.deck, woodyPlantDto, woodyPlants);
    if (!woodyPlant) {
      unavailableWoodyPlants.push(woodyPlantDto);
      continue;
    }

    for (const dwellerDto of woodyPlantDto.dwellers) {
      const dweller = findDwellerOfDto(game.deck, dwellerDto, dwellers);
      if (!dweller) {
        unavailableDwellers.push(dwellerDto);
        continue;
      }

      woodyPlant = produce(woodyPlant, (draft) => {
        draft.dwellers[dweller.position].push(dweller);
      });

      dwellers.push(dweller);
      game.deck.dwellers = game.deck.dwellers.filter(
        (d) => d.id !== dweller.id,
      );
    }

    woodyPlants.push(woodyPlant);
    game.deck.woodyPlants = game.deck.woodyPlants.filter(
      (w) => w.id !== woodyPlant.id,
    );
  }

  if (
    !cave ||
    unavailableDwellers.length > 0 ||
    unavailableWoodyPlants.length > 0
  ) {
    return createErrorResult(ImportErrorType.UnavailableCards, {
      cave: cave ? null : caveDto,
      dwellers: unavailableDwellers,
      woodyPlants: unavailableWoodyPlants,
    });
  }

  const player = createPlayer(findUniqueName(game, name), cave, woodyPlants);
  return createSuccessResult(player);
};

const createErrorResult = (
  error: ImportErrorType,
  unavailableCards?: ErrorPlayerImportResult["unavailableCards"],
): ErrorPlayerImportResult => ({
  success: false,
  error,
  unavailableCards,
});

const createSuccessResult = (player: Player): SuccessPlayerImportResult => ({
  success: true,
  player,
});

const findUniqueName = (game: Game, name: string): string => {
  let uniqueName = name;

  let counter = 1;
  while (game.players.some((player) => player.name === uniqueName)) {
    uniqueName = `${name} (${counter})`;
    counter++;
  }

  return uniqueName;
};

const findWoodyPlantOfDto = (
  deck: Deck,
  dto: WoodyPlantCardDto,
  alreadyFoundCards: WoodyPlantCard[],
): WoodyPlantCard | undefined => {
  const woodyPlant = deck.woodyPlants.find(
    (woodyPlant) =>
      woodyPlant.name === dto.name &&
      woodyPlant.gameBox === dto.gameBox &&
      woodyPlant.treeSymbol === dto.treeSymbol &&
      !alreadyFoundCards.some((found) => found.id === woodyPlant.id),
  );
  if (woodyPlant) {
    return woodyPlant;
  }

  const blueprint = Object.values(WoodyPlants).find((b) => b.name === dto.name);
  const variant = blueprint?.variants.find(
    (v) => v.gameBox === dto.gameBox && v.treeSymbol === dto.treeSymbol,
  );
  if (blueprint?.isPartOfDeck === false && variant) {
    return createWoodyPlant(blueprint, variant);
  }
};

const findDwellerOfDto = (
  deck: Deck,
  dto: DwellerCardDto,
  alreadyFoundCards: DwellerCard[],
): DwellerCard | undefined =>
  deck.dwellers.find(
    (d) =>
      d.name === dto.name &&
      d.gameBox === dto.gameBox &&
      d.treeSymbol === dto.treeSymbol &&
      d.position === dto.position &&
      !alreadyFoundCards.some((found) => found.id === d.id),
  );

const findCaveOfDto = (deck: Deck, dto: CaveDto): Cave | undefined =>
  deck.caves.find((c) => c.name === dto.name);
