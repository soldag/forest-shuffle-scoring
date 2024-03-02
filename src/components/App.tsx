import { IntlProvider } from "react-intl";

import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

import RootContainer from "@/components/containers/RootContainer";
import { GameContextProvider } from "@/components/contexts/GameContext";
import theme from "@/styles/theme";
import translations from "@/translations";

const locale = navigator.language && navigator.language.split(/[-_]/)[0];

const App = () => (
  <IntlProvider locale={locale} messages={translations[locale]}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GameContextProvider>
        <RootContainer />
      </GameContextProvider>
    </CssVarsProvider>
  </IntlProvider>
);

export default App;
