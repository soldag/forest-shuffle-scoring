import { IntlProvider } from "react-intl";

import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

import translations from "@/translations";

const locale = navigator.language && navigator.language.split(/[-_]/)[0];

const App = () => (
  <IntlProvider locale={locale} messages={translations[locale]}>
    <CssVarsProvider>
      <CssBaseline />
    </CssVarsProvider>
  </IntlProvider>
);

export default App;
