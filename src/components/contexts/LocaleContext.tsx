import { ReactNode, createContext, useCallback, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import translations from "@/translations";
import { Locale } from "@/types";
import { useSearchParam } from "@/utils/hooks";

const fallbackLocale = Locale.En;
const supportedLocales = Object.values(Locale);

const getSimpleLanguage = (language: string): string => language.split("-")[0];

const coerceToLocale = (value: string | null): Locale | undefined =>
  supportedLocales.find((l) => l === value?.toLocaleLowerCase());

const detectLocale = (): Locale => {
  const language = navigator.language.toLowerCase();
  const simpleLanguage = getSimpleLanguage(language);

  return (
    coerceToLocale(language) ??
    supportedLocales.find((l) => getSimpleLanguage(l) === simpleLanguage) ??
    fallbackLocale
  );
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const defaultLocale = detectLocale();
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

  const locale =
    coerceToLocale(searchLocale) ||
    coerceToLocale(storedLocale) ||
    defaultLocale;

  const setLocale = useCallback(
    (value: Locale) => {
      setSearchLocale(null);
      setStoredLocale(value);
    },
    [setSearchLocale, setStoredLocale],
  );

  useEffect(() => {
    if (!supportedLocales.includes(storedLocale)) {
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
