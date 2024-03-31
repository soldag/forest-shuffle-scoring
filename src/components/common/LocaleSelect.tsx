import * as _ from "lodash-es";

import { Option, Select, SelectProps, Typography } from "@mui/joy";

import { Locale } from "@/types";

const LOCALES = _.orderBy(
  [
    {
      code: "de",
      flag: "🇩🇪",
      label: "Deutsch",
    },
    {
      code: "en",
      flag: "🇺🇸",
      label: "English",
    },
  ],
  (l) => l.label,
);

const LocaleSelect: React.FC<SelectProps<Locale, false>> = (props) => (
  <Select {...props}>
    {LOCALES.map(({ code, flag, label }) => (
      <Option key={code} value={code} label={flag}>
        <Typography startDecorator={flag}>{label}</Typography>
      </Option>
    ))}
  </Select>
);

export default LocaleSelect;
