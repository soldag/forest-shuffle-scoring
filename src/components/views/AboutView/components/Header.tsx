import React, { useContext } from "react";

import { Stack } from "@mui/joy";

import HeaderTitle from "@/components/common/HeaderTitle";
import LanguageSelect from "@/components/common/LocaleSelect";
import LocaleContext from "@/components/contexts/LocaleContext";

const Header: React.FC = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  return (
    <Stack direction="row" alignItems="center" columnGap={2}>
      <HeaderTitle sx={{ flexGrow: 1 }} />

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
