import { MessageDescriptor, defineMessages } from "react-intl";

import { TreeSymbol } from "@/game";

const messages = defineMessages<TreeSymbol, MessageDescriptor>({
  ALPINE_LARCH: {
    id: "TreeSymbols.AlpineLarch",
    defaultMessage: "Alpine Larch",
  },
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
  SWISS_PINE: {
    id: "TreeSymbols.SwissPine",
    defaultMessage: "Swiss Pine",
  },
  SYCAMORE: {
    id: "TreeSymbols.Sycamore",
    defaultMessage: "Sycamore",
  },
});

export default messages;
