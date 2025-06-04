import * as Dwellers from "@/game/dwellers";
import { createDweller, createWoodyPlant, generateId } from "@/game/factory";
import * as WoodyPlants from "@/game/woody-plants";

import {
  DwellerCard,
  DwellerCardBlueprint,
  Forest,
  Game,
  WoodyPlantCard,
  WoodyPlantCardBlueprint,
} from "../types";
import { createFakeWoodyPlant } from "./fake";

export const generateCardIds = (count: number) =>
  Array(count)
    .fill(0)
    .map(() => generateId());

export const createAllDwellers = (blueprint: DwellerCardBlueprint) =>
  blueprint.variants
    .flatMap((v) =>
      Array(v.count)
        .fill(0)
        .map(() => createDweller(blueprint, v)),
    )
    .toSorted((a, b) => a.id.localeCompare(b.id));

export const createAnyDweller = (blueprint: DwellerCardBlueprint) =>
  createDweller(blueprint, blueprint.variants[0]!);

export const createAnyWoodyPlant = (blueprint: WoodyPlantCardBlueprint) =>
  createWoodyPlant(blueprint, blueprint.variants[0]);

export const createDwellerSets = (
  blueprintUnderTest: DwellerCardBlueprint,
  otherBlueprints: DwellerCardBlueprint[],
  lengths: number[],
) => {
  const totalCount = lengths.reduce((a, b) => a + b, 0);
  const ids = generateCardIds(totalCount).toSorted();
  const allBlueprints = [blueprintUnderTest, ...otherBlueprints];

  const [dwellerUnderTest, ...otherDwellers] = lengths
    .flatMap((n) => allBlueprints.slice(0, n).map(createAnyDweller))
    .map((dweller, i) => ({
      ...dweller,
      id: ids[i],
    }));

  return { dwellerUnderTest, otherDwellers };
};

export const createWoodyPlants = (
  blueprint: WoodyPlantCardBlueprint,
  count: number,
) =>
  Array(count)
    .fill(0)
    .map(() => createAnyWoodyPlant(blueprint));

export const addDwellersToWoodyPlant = (
  woodyPlant: WoodyPlantCard,
  ...dwellers: DwellerCard[]
) =>
  dwellers.reduce((woodyPlant, dweller) => {
    return {
      ...woodyPlant,
      dwellers: {
        ...woodyPlant.dwellers,
        [dweller.position]: [...woodyPlant.dwellers[dweller.position], dweller],
      },
    };
  }, woodyPlant);

export const createForestWith = ({
  woodyPlants = [],
  dwellers = [],
  caveCardCount = 0,
}: {
  woodyPlants?: WoodyPlantCard[];
  dwellers?: DwellerCard[];
  caveCardCount?: number;
}) => {
  for (const dweller of dwellers) {
    const woodyPlant = addDwellersToWoodyPlant(
      woodyPlants.find((w) => w.dwellers[dweller.position].length === 0) ??
        createFakeWoodyPlant(),
      dweller,
    );
    woodyPlants = [
      ...woodyPlants.filter((w) => w.id !== woodyPlant.id),
      woodyPlant,
    ];
  }

  return { woodyPlants, caveCardCount };
};

export const createForestForWoodyPlantTest = ({
  woodyPlantUnderTest,
  otherWoodyPlants = [],
  dwellers = [],
  caveCardCount = 0,
}: {
  woodyPlantUnderTest: WoodyPlantCard;
  otherWoodyPlants?: WoodyPlantCard[];
  dwellers?: DwellerCard[];
  caveCardCount?: number;
}) => {
  const forest = createForestWith({
    woodyPlants: [woodyPlantUnderTest, ...otherWoodyPlants],
    dwellers,
    caveCardCount,
  });

  return {
    forest,
    woodyPlant: forest.woodyPlants.find(
      (w) => w.id === woodyPlantUnderTest.id,
    )!,
  };
};

export const createForestForDwellerTest = ({
  dwellerUnderTest,
  woodyPlantUnderTest,
  otherDwellers = [],
  otherWoodyPlants = [],
  caveCardCount = 0,
}: {
  dwellerUnderTest: DwellerCard;
  woodyPlantUnderTest?: WoodyPlantCard;
  otherDwellers?: DwellerCard[];
  otherWoodyPlants?: WoodyPlantCard[];
  caveCardCount?: number;
}) => {
  if (!woodyPlantUnderTest) {
    [woodyPlantUnderTest, ...otherWoodyPlants] = otherWoodyPlants;
  }
  woodyPlantUnderTest = addDwellersToWoodyPlant(
    woodyPlantUnderTest ?? createFakeWoodyPlant(),
    dwellerUnderTest,
  );

  return {
    ...createForestForWoodyPlantTest({
      woodyPlantUnderTest,
      otherWoodyPlants,
      dwellers: otherDwellers,
      caveCardCount,
    }),
    dweller: dwellerUnderTest,
  };
};

export function createCompleteForestWithWoodyPlant({
  woodyPlantUnderTest,
  filterDwellers = () => true,
  filterWoodyPlants = () => true,
}: {
  woodyPlantUnderTest: WoodyPlantCard;
  filterDwellers?: (dweller: DwellerCard) => boolean;
  filterWoodyPlants?: (woodyPlant: WoodyPlantCard) => boolean;
}): { woodyPlant: WoodyPlantCard; forest: Forest } {
  const dwellers = Object.values(Dwellers)
    .flatMap((b) => b.variants.map((v) => createDweller(b, v)))
    .filter(filterDwellers);

  const woodyPlants = Object.values(WoodyPlants)
    .map((b) => createAnyWoodyPlant(b))
    .filter(filterWoodyPlants)
    .filter(
      (wp) =>
        wp.name !== woodyPlantUnderTest.name ||
        wp.treeSymbol !== woodyPlantUnderTest.treeSymbol,
    );

  return createForestForWoodyPlantTest({
    woodyPlantUnderTest,
    dwellers,
    otherWoodyPlants: woodyPlants,
  });
}

export function createCompleteForestWithDweller({
  dwellerUnderTest,
  filterDwellers = () => true,
  filterWoodyPlants = () => true,
}: {
  dwellerUnderTest: DwellerCard;
  filterDwellers?: (dweller: DwellerCard) => boolean;
  filterWoodyPlants?: (woodyPlant: WoodyPlantCard) => boolean;
}): { dweller: DwellerCard; woodyPlant: WoodyPlantCard; forest: Forest } {
  const dwellers = Object.values(Dwellers)
    .flatMap((b) => b.variants.map((v) => createDweller(b, v)))
    .filter(filterDwellers)
    .filter(
      (d) =>
        d.position !== dwellerUnderTest?.position ||
        d.treeSymbol !== dwellerUnderTest?.treeSymbol,
    );

  const woodyPlants = Object.values(WoodyPlants)
    .map((b) => createAnyWoodyPlant(b))
    .filter(filterWoodyPlants);

  return createForestForDwellerTest({
    dwellerUnderTest,
    otherDwellers: dwellers,
    otherWoodyPlants: woodyPlants,
  });
}

export const createGame: (...forests: Forest[]) => Game = (...forests) => ({
  id: generateId(),
  gameBoxes: [],
  deck: {
    woodyPlants: [],
    dwellers: [],
  },
  players: forests.map((forest, i) => ({
    id: generateId(),
    name: `Player ${i}`,
    forest,
  })),
});
