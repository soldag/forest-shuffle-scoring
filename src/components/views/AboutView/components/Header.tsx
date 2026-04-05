import { useContext } from "react";

import { Stack } from "@mui/joy";

import HeaderTitle from "@/components/common/HeaderTitle";
import LanguageSelect from "@/components/common/LocaleSelect";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import LocaleContext from "@/components/contexts/LocaleContext";

const Header = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  return (
    <Stack direction="row" alignItems="center" columnGap={2}>
      <HeaderTitle sx={{ flexGrow: 1 }} />

      <ThemeToggleButton />

      <LanguageSelect
        variant="plain"
        value={locale}
        onChange={(_, value) => setLocale(value!)}
        slotProps={{
          listbox: { placement: "bottom-start" },
        }}
        sx={{ flexShrink: 0 }}
      />
    </Stack>
  );
};
export default Header;
