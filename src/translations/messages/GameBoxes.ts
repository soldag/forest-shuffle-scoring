import { MessageDescriptor, defineMessages } from "react-intl";

import { GameBox } from "@/game";

const messages = defineMessages<GameBox, MessageDescriptor>({
  ALPINE: {
    id: "GameBoxes.Alpine",
    defaultMessage: "Alpine expansion",
  },
  BASE: {
    id: "GameBoxes.Base",
    defaultMessage: "Base game",
  },
  EXPLORATION: {
    id: "GameBoxes.Exploration",
    defaultMessage: "Exploration expansion",
  },
  PROMO_CARDS: {
    id: "GameBoxes.PromoCards",
    defaultMessage: "Promo cards",
  },
  WOODLAND_EDGE: {
    id: "GameBoxes.WoodlandEdge",
    defaultMessage: "Woodland Edge expansion",
  },
});

export default messages;
