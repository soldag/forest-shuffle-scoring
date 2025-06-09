import { CardBlueprint } from "@/game/types";
import { PartialExcept } from "@/utils/types";

export const extendBlueprint = <T extends CardBlueprint>(
  blueprint: T,
  props: Omit<PartialExcept<T, "name">, "countsAs">,
): T => ({
  ...blueprint,
  ...props,
  countsAs: blueprint.name,
});
