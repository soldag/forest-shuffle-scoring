import { encode } from "@/game/sharing/encoding";
import {
  CaveDto,
  DwellerCardDto,
  ForestDto,
  PlayerDto,
  PlayerExportDto,
  WoodyPlantCardDto,
} from "@/game/sharing/types";
import {
  Cave,
  DwellerCard,
  DwellerPosition,
  Forest,
  Game,
  Player,
  WoodyPlantCard,
} from "@/game/types";

export const encodePlayer = (game: Game, player: Player): string =>
  encode(createPlayerExportDto(game, player));

export const createPlayerExportDto = (
  game: Game,
  player: Player,
): PlayerExportDto => ({
  appVersion: import.meta.env.PACKAGE_VERSION,
  gameBoxes: game.gameBoxes,
  player: createPlayerDto(player),
});

const createPlayerDto = (player: Player): PlayerDto => ({
  name: player.name,
  forest: createForestDto(player.forest),
});

const createForestDto = (forest: Forest): ForestDto => ({
  woodyPlants: forest.woodyPlants.map(createWoodyPlantDto),
  cave: createCaveDto(forest.cave),
});

const createCaveDto = (cave: Cave): CaveDto => ({
  name: cave.name,
  cardCount: cave.cardCount,
});

const createWoodyPlantDto = (
  woodyPlant: WoodyPlantCard,
): WoodyPlantCardDto => ({
  name: woodyPlant.name,
  gameBox: woodyPlant.gameBox,
  treeSymbol: woodyPlant.treeSymbol,
  dwellers: Object.entries(woodyPlant.dwellers).flatMap(
    ([position, dwellers]) =>
      dwellers.map((dweller) => createDwellerDto(dweller, position)),
  ),
});

const createDwellerDto = (
  dweller: DwellerCard,
  position: DwellerPosition,
): DwellerCardDto => ({
  name: dweller.name,
  gameBox: dweller.gameBox,
  treeSymbol: dweller.treeSymbol,
  position,
});
