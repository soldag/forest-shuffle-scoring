import { ReactNode, createContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import translations from "@/translations";
import { Locale } from "@/types";

const fallbackLocale = "en";
const browserLocale = navigator?.language?.split(/[-_]/)[0]?.toLowerCase();
const defaultLocale = Object.keys(translations).includes(browserLocale)
  ? (browserLocale as Locale)
  : fallbackLocale;

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

export const LocaleContextProvider: React.FC<LocaleContextProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useLocalStorage("locale", defaultLocale);

  useEffect(() => {
    if (!Object.keys(translations).includes(locale)) {
      setLocale(defaultLocale);
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
