import { Locale } from "@/types";

import de from "./de.json";
import en from "./en.json";
import nl from "./nl.json";
import ptBr from "./pt-br.json";

const translations: Record<Locale, Record<string, string>> = {
  [Locale.De]: de,
  [Locale.En]: en,
  [Locale.Nl]: nl,
  [Locale.PtBr]: ptBr,
};

export default translations;
