import { useContext } from "react";

import { Stack } from "@mui/joy";

import HeaderTitle from "@/components/common/HeaderTitle";
import LanguageSelect from "@/components/common/LocaleSelect";
import LocaleContext from "@/components/contexts/LocaleContext";
import ThemeSelect from "@/components/common/ThemeSelect";

const Header = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  return (
    <Stack direction="row" alignItems="center" columnGap={2}>
      <HeaderTitle sx={{ flexGrow: 1 }} />

      <ThemeSelect />

      <LanguageSelect
        variant="plain"
        value={locale}
        onChange={(_, value) => setLocale(value!)}
        slotProps={{
          listbox: { placement: "bottom-start" },
        }}
      />
    </Stack>
  );
};
export default Header;
