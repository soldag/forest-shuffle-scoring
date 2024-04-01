import { useIntl } from "react-intl";
import { useDocumentTitle } from "usehooks-ts";

import CommonMessages from "@/translations/messages/Common";

const DocumentTitleLocalizer: React.FC = () => {
  const intl = useIntl();

  useDocumentTitle(intl.formatMessage(CommonMessages.appName));

  return null;
};

export default DocumentTitleLocalizer;
