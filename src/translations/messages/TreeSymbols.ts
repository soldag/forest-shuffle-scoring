import { IntlShape, MessageDescriptor, defineMessages } from "react-intl";

const messages = defineMessages<string, MessageDescriptor | undefined>({
  BEECH: {
    id: "TreeSymbols.Beech",
    defaultMessage: "Beech",
  },
  BIRCH: {
    id: "TreeSymbols.Birch",
    defaultMessage: "Birch",
  },
  DOUGLAS_FIR: {
    id: "TreeSymbols.DouglasFir",
    defaultMessage: "Douglas Fir",
  },
  HORSE_CHESTNUT: {
    id: "TreeSymbols.HorseChestnut",
    defaultMessage: "Horse Chestnut",
  },
  LINDEN: {
    id: "TreeSymbols.Linden",
    defaultMessage: "Linden",
  },
  OAK: {
    id: "TreeSymbols.Oak",
    defaultMessage: "Oak",
  },
  SILVER_FIR: {
    id: "TreeSymbols.SilverFir",
    defaultMessage: "Silver Fir",
  },
  SYCAMORE: {
    id: "TreeSymbols.Sycamore",
    defaultMessage: "Sycamore",
  },
});

export default messages;

export const getLocalizedTreeSymbol = (intl: IntlShape, name: string) => {
  const message = messages[name];
  return message ? intl.formatMessage(message) : null;
};
