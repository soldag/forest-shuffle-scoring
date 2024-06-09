import { ErrorBoundary } from "react-error-boundary";

import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

import DocumentMetaProvider from "@/components/common/DocumentMetaProvider";
import RootContainer from "@/components/containers/RootContainer";
import { AppUpdateContextProvider } from "@/components/contexts/AppUpdateContext";
import { GameContextProvider } from "@/components/contexts/GameContext";
import { LocaleContextProvider } from "@/components/contexts/LocaleContext";
import { TutorialContextProvider } from "@/components/contexts/TutorialContext";
import ErrorView from "@/components/views/ErrorView";
import theme from "@/styles/theme";

const App = () => (
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <LocaleContextProvider>
      <ErrorBoundary fallback={<ErrorView />}>
        <AppUpdateContextProvider>
          <DocumentMetaProvider />
          <GameContextProvider>
            <TutorialContextProvider>
              <RootContainer />
            </TutorialContextProvider>
          </GameContextProvider>
        </AppUpdateContextProvider>
      </ErrorBoundary>
    </LocaleContextProvider>
  </CssVarsProvider>
);

export default App;
