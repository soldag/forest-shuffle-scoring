import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

import { useTheme } from "@mui/joy";

import appleTouchIcon from "@/assets/icons/apple-touch-icon-180x180.png";
import favIcon from "@/assets/icons/favicon.ico";
import icon from "@/assets/icons/icon.svg";
import manifestDe from "@/assets/manifests/de.webmanifest";
import manifestEn from "@/assets/manifests/en.webmanifest";
import LocaleContext from "@/components/contexts/LocaleContext";
import CommonMessages from "@/translations/messages/Common";

const manifests = {
  de: manifestDe,
  en: manifestEn,
};

const DocumentMetaProvider: React.FC = () => {
  const theme = useTheme();

  const intl = useIntl();
  const { locale } = useContext(LocaleContext);

  return (
    <Helmet>
      <title>{intl.formatMessage(CommonMessages.appName)}</title>
      <meta
        name="description"
        content={intl.formatMessage(CommonMessages.appDescription)}
      />
      <link rel="manifest" href={manifests[locale]} />
      <link rel="icon" href={favIcon} />
      <link rel="mask-icon" href={icon} color="#ffffff" />
      <link rel="apple-touch-icon" href={appleTouchIcon} sizes="180x180" />
      <meta name="theme-color" content={theme.palette.primary[500]} />
    </Helmet>
  );
};

export default DocumentMetaProvider;
