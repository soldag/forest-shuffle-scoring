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
      <link rel="icon" href={resolvePublic("icons/favicon.ico")} />
      <link
        rel="mask-icon"
        href={resolvePublic("icons/maskable-icon-512x512.png")}
        color="#ffffff"
      />
      <link
        rel="apple-touch-icon"
        href={resolvePublic("icons/apple-touch-icon-180x180.png")}
        sizes="180x180"
      />
      <meta name="theme-color" content={theme.palette.neutral[50]} />
    </Helmet>
  );
};

export default DocumentMetaProvider;
