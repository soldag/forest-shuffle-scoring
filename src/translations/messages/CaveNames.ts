import { MessageDescriptor, defineMessages } from "react-intl";

const messages = defineMessages<string, MessageDescriptor>({
  BAT_CAVE: {
    id: "CaveNames.BatCave",
    defaultMessage: "Bat Cave",
  },
  COLLECTORS_CAVE: {
    id: "CaveNames.CollectorsCave",
    defaultMessage: "Collectors' Cave",
  },
  LONELY_CAVE: {
    id: "CaveNames.LonelyCave",
    defaultMessage: "Lonely Cave",
  },
  REGULAR_CAVE: {
    id: "CaveNames.RegularCave",
    defaultMessage: "Regular Cave",
  },
  SMUGGLERS_CAVE: {
    id: "CaveNames.SmugglersCave",
    defaultMessage: "Smuggler's Cave",
  },
  STORAGE_CAVE: {
    id: "CaveNames.StorageCave",
    defaultMessage: "Storage Cave",
  },
});

export default messages;
