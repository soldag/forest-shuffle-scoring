import { z } from "zod";

import {
  CaveDtoSchema,
  DwellerCardDtoSchema,
  ForestDtoSchema,
  GameDtoSchema,
  PlayerDtoSchema,
  PlayerExportDtoSchema,
  WoodyPlantCardDtoSchema,
} from "./schemas";

export type DwellerCardDto = z.infer<typeof DwellerCardDtoSchema>;
export type WoodyPlantCardDto = z.infer<typeof WoodyPlantCardDtoSchema>;
export type CaveDto = z.infer<typeof CaveDtoSchema>;
export type ForestDto = z.infer<typeof ForestDtoSchema>;
export type PlayerDto = z.infer<typeof PlayerDtoSchema>;
export type PlayerExportDto = z.infer<typeof PlayerExportDtoSchema>;
export type GameDto = z.infer<typeof GameDtoSchema>;
