import { upperCase } from "lodash";
import { useIntl } from "react-intl";

import { Option, Select, useColorScheme } from "@mui/joy";
import { Mode } from "@mui/system/cssVars/useCurrentColorScheme";

interface ThemeOptions {
  mode: Mode;
  label: string;
}

const ThemeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const intl = useIntl();

  const options: ThemeOptions[] = (
    ["system", "light", "dark"] satisfies Mode[]
  ).map((themeMode) => ({
    mode: themeMode,
    label: intl.formatMessage({
      id: `ThemeMode.${themeMode}`,
      defaultMessage: `${upperCase(themeMode[0])}${themeMode.substring(1)}`,
    }),
  }));

  return (
    <Select
      variant="plain"
      value={mode}
      onChange={(_, newMode) => {
        setMode(newMode);
      }}
    >
      {options.map(({ mode, label }) => (
        <Option key={mode} value={mode}>
          {label}
        </Option>
      ))}
    </Select>
  );
};
export default ThemeSelect;
