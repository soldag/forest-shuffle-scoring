import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

import DocumentMetaProvider from "@/components/common/DocumentMetaProvider";
import RootContainer from "@/components/containers/RootContainer";
import { AppUpdateContextProvider } from "@/components/contexts/AppUpdateContext";
import { GameContextProvider } from "@/components/contexts/GameContext";
import { LocaleContextProvider } from "@/components/contexts/LocaleContext";
import { TutorialContextProvider } from "@/components/contexts/TutorialContext";
import theme from "@/styles/theme";

const App = () => (
  <AppUpdateContextProvider>
    <LocaleContextProvider>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <DocumentMetaProvider />
        <GameContextProvider>
          <TutorialContextProvider>
            <RootContainer />
          </TutorialContextProvider>
        </GameContextProvider>
      </CssVarsProvider>
    </LocaleContextProvider>
  </AppUpdateContextProvider>
);

export default App;
