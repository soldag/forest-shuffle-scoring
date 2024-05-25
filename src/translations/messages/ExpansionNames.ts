import { MessageDescriptor, defineMessages } from "react-intl";

import { Expansion } from "@/game";

const messages = defineMessages<Expansion, MessageDescriptor>({
  ALPINE: {
    id: "ExpansionNames.Alpine",
    defaultMessage: "Alpine expansion",
  },
});

export default messages;
