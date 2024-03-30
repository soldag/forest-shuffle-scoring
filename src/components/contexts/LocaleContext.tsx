import { ReactNode, createContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import translations from "@/translations";
import { Locale } from "@/types";

const FALLBACK_LOCALE = "en";
const BROWSER_LOCALE = navigator?.language?.split(/[-_]/)[0]?.toLowerCase();
const DEFAULT_LOCALE = Object.keys(translations).includes(BROWSER_LOCALE)
  ? (BROWSER_LOCALE as Locale)
  : FALLBACK_LOCALE;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

interface LocaleContextProviderProps {
  children?: ReactNode;
}

export const LocaleContextProvider: React.FC<LocaleContextProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useLocalStorage("locale", DEFAULT_LOCALE);

  useEffect(() => {
    if (!Object.keys(translations).includes(locale)) {
      setLocale(DEFAULT_LOCALE);
    }
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={translations[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
