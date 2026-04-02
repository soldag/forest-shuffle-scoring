import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, useColorScheme } from "@mui/joy";
import { Mode } from "@mui/system/cssVars/useCurrentColorScheme";

const VALID_MODES = ["system", "light", "dark"];

const getIcon = (mode?: Mode) => {
  switch (mode) {
    case "light":
      return <LightModeIcon />;
    case "dark":
      return <DarkModeIcon />;
    default:
      return <ContrastIcon />;
  }
};

const ThemeToggleButton = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  const [storedMode, setStoredMode, removeStoredMode] = useLocalStorage<Mode>(
    "theme",
    mode ?? "system",
  );

  useEffect(() => {
    if (VALID_MODES.includes(storedMode)) {
      setMode(storedMode);
    } else {
      removeStoredMode();
    }
  }, [storedMode, setMode, removeStoredMode]);

  const handleClick = () => {
    const modeOrder: Mode[] =
      systemMode === "light"
        ? ["system", "dark", "light"]
        : ["system", "light", "dark"];

    const currentIndex = mode ? modeOrder.indexOf(mode) : 0;
    const newIndex = (currentIndex + 1) % modeOrder.length;
    const newMode = modeOrder[newIndex];

    setMode(newMode);
    setStoredMode(newMode);
  };

  return (
    <IconButton variant="plain" size="sm" onClick={handleClick}>
      {getIcon(mode)}
    </IconButton>
  );
};
export default ThemeToggleButton;
