import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

import RootContainer from "@/components/containers/RootContainer";
import { GameContextProvider } from "@/components/contexts/GameContext";
import { LocaleContextProvider } from "@/components/contexts/LocaleContext";
import theme from "@/styles/theme";

const App = () => (
  <LocaleContextProvider>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GameContextProvider>
        <RootContainer />
      </GameContextProvider>
    </CssVarsProvider>
  </LocaleContextProvider>
);

export default App;
