import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

import { useTheme } from "@mui/joy";

import LocaleContext from "@/components/contexts/LocaleContext";
import CommonMessages from "@/translations/messages/Common";
import { Locale } from "@/types";
import { resolvePublic } from "@/utils/assets";

const DocumentMetaProvider = () => {
  const theme = useTheme();

  const intl = useIntl();
  const { locale } = useContext(LocaleContext);

  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
    >
      <title>{intl.formatMessage(CommonMessages.appName)}</title>
      <meta
        name="description"
        content={intl.formatMessage(CommonMessages.appDescription)}
      />
      <meta
        name="keywords"
        content={intl.formatMessage(CommonMessages.appKeywords)}
      />
      <link
        rel="manifest"
        href={resolvePublic(`manifests/${locale}.webmanifest`)}
      />
      {Object.values(Locale).map((locale) => (
        <link
          key={locale}
          rel="alternate"
          href={`https://soldag.github.io/forest-shuffle-scoring/?lang=${locale}`}
          hrefLang={locale}
        />
      ))}
      <meta name="theme-color" content={theme.palette.neutral[50]} />
    </Helmet>
  );
};

export default DocumentMetaProvider;
