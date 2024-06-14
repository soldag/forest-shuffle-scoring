import { ReactNode, createContext, useCallback, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import translations from "@/translations";
import { Locale } from "@/types";
import { useSearchParam } from "@/utils/hooks";

const fallbackLocale = Locale.En;
const browserLocale = navigator?.language?.split(/[-_]/)[0]?.toLowerCase();
const defaultLocale = Object.keys(translations).includes(browserLocale)
  ? (browserLocale as Locale)
  : fallbackLocale;

const castToLocale = (value: string | null) =>
  Object.values(Locale).includes(value as Locale) ? (value as Locale) : null;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
});

interface LocaleContextProviderProps {
  children?: ReactNode;
}

export const LocaleContextProvider = ({
  children,
}: LocaleContextProviderProps) => {
  const [searchLocale, setSearchLocale] = useSearchParam("lang");
  const [storedLocale, setStoredLocale] = useLocalStorage(
    "locale",
    defaultLocale,
  );

  const locale = castToLocale(searchLocale) || storedLocale || defaultLocale;

  const setLocale = useCallback(
    (value: Locale) => {
      setSearchLocale(null);
      setStoredLocale(value);
    },
    [setSearchLocale, setStoredLocale],
  );

  useEffect(() => {
    if (!Object.values(Locale).includes(storedLocale)) {
      setStoredLocale(defaultLocale);
    }
  }, [storedLocale, setStoredLocale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={translations[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
