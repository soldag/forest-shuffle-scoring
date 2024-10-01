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
});

export default messages;
