import { MessageDescriptor, defineMessages } from "react-intl";

import { CardType } from "@/game";

type Numerus = "singular" | "plural";

const messages: { [key in CardType]: Record<Numerus, MessageDescriptor> } = {
  ALPS: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Alps.singular",
      defaultMessage: "Alps",
    },
    plural: {
      id: "CardTypes.Alps.plural",
      defaultMessage: "Alps",
    },
  }),
  AMPHIBIAN: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Amphibian.singular",
      defaultMessage: "Amphibian",
    },
    plural: {
      id: "CardTypes.Amphibian.plural",
      defaultMessage: "Amphibians",
    },
  }),
  BAT: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Bat.singular",
      defaultMessage: "Bat",
    },
    plural: {
      id: "CardTypes.Bat.plural",
      defaultMessage: "Bats",
    },
  }),
  BIRD: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Bird.singular",
      defaultMessage: "Bird",
    },
    plural: {
      id: "CardTypes.Bird.plural",
      defaultMessage: "Birds",
    },
  }),
  BUTTERFLY: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Butterfly.singular",
      defaultMessage: "Butterfly",
    },
    plural: {
      id: "CardTypes.Butterfly.plural",
      defaultMessage: "Butterflies",
    },
  }),
  CLOVENHOOFED_ANIMAL: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.ClovenhoofedAnimal.singular",
      defaultMessage: "Cloven-hoofed animal",
    },
    plural: {
      id: "CardTypes.ClovenhoofedAnimal.plural",
      defaultMessage: "Cloven-hoofed animal",
    },
  }),
  DEER: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Deer.singular",
      defaultMessage: "Deer",
    },
    plural: {
      id: "CardTypes.Deer.plural",
      defaultMessage: "Deer",
    },
  }),
  INSECT: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Insect.singular",
      defaultMessage: "Insect",
    },
    plural: {
      id: "CardTypes.Insect.plural",
      defaultMessage: "Insects",
    },
  }),
  MUSHROOM: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Mushroom.singular",
      defaultMessage: "Mushroom",
    },
    plural: {
      id: "CardTypes.Mushroom.plural",
      defaultMessage: "Mushrooms",
    },
  }),
  PAWED_ANIMAL: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.PawedAnimal.singular",
      defaultMessage: "Pawed animal",
    },
    plural: {
      id: "CardTypes.PawedAnimal.plural",
      defaultMessage: "Pawed animals",
    },
  }),
  PERSON: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Person.singular",
      defaultMessage: "Person",
    },
    plural: {
      id: "CardTypes.Person.plural",
      defaultMessage: "Persons",
    },
  }),
  PLANT: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Plant.singular",
      defaultMessage: "Plant",
    },
    plural: {
      id: "CardTypes.Plant.plural",
      defaultMessage: "Plants",
    },
  }),
  SHRUB: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Shrub.singular",
      defaultMessage: "Shrub",
    },
    plural: {
      id: "CardTypes.Shrub.plural",
      defaultMessage: "Shrubs",
    },
  }),
  SWAMP: {
    singular: {
      id: "CardTypes.Swamp.singular",
      defaultMessage: "Swamp",
    },
    plural: {
      id: "CardTypes.Swamp.singular",
      defaultMessage: "Swamps",
    },
  },
  TREE: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.Tree.singular",
      defaultMessage: "Tree",
    },
    plural: {
      id: "CardTypes.Tree.plural",
      defaultMessage: "Trees",
    },
  }),
  WOODLAND_EDGE: defineMessages<Numerus, MessageDescriptor>({
    singular: {
      id: "CardTypes.WoodlandEdge.singular",
      defaultMessage: "Woodland edge",
    },
    plural: {
      id: "CardTypes.WoodlandEdge.plural",
      defaultMessage: "Woodland edge",
    },
  }),
};

export default messages;
