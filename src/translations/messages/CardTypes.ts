import { MessageDescriptor, defineMessages } from "react-intl";

import { CardType } from "@/game";

const messages = defineMessages<CardType, MessageDescriptor>({
  ALPS: {
    id: "CardTypes.Alps",
    defaultMessage: "Alps",
  },
  AMPHIBIAN: {
    id: "CardTypes.Amphibian",
    defaultMessage: "Amphibian",
  },
  BAT: {
    id: "CardTypes.Bat",
    defaultMessage: "Bat",
  },
  BIRD: {
    id: "CardTypes.Bird",
    defaultMessage: "Bird",
  },
  BUTTERFLY: {
    id: "CardTypes.Butterfly",
    defaultMessage: "Butterfly",
  },
  CLOVENHOOFED_ANIMAL: {
    id: "CardTypes.ClovenhoofedAnimal",
    defaultMessage: "Cloven-hoofed animal",
  },
  DEER: {
    id: "CardTypes.Deer",
    defaultMessage: "Deer",
  },
  INSECT: {
    id: "CardTypes.Insect",
    defaultMessage: "Insect",
  },
  MUSHROOM: {
    id: "CardTypes.Mushroom",
    defaultMessage: "Mushroom",
  },
  PAWED_ANIMAL: {
    id: "CardTypes.PawedAnimal",
    defaultMessage: "Pawed animal",
  },
  PLANT: {
    id: "CardTypes.Plant",
    defaultMessage: "Plant",
  },
  TREE: {
    id: "CardTypes.Tree",
    defaultMessage: "Tree",
  },
});

export default messages;
