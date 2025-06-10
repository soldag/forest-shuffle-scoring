import * as _ from "lodash-es";
import { useIntl } from "react-intl";

import { Option, Select, SelectProps } from "@mui/joy";

import CaveNameMessages from "@/translations/messages/CaveNames";

interface CaveNameSelectProps
  extends Omit<SelectProps<string, false>, "onChange"> {
  onChange?: (value: string | null) => void;
  options?: string[];
}

const CaveNameSelect = ({
  onChange,
  options = [],
  ...remainingProps
}: CaveNameSelectProps) => {
  const intl = useIntl();

  const sortedOptions = _.orderBy(
    Object.entries(CaveNameMessages)
      .filter(([value]) => options.includes(value))
      .map(([value, messageDescriptor]) => ({
        value,
        text: intl.formatMessage(messageDescriptor),
      })),
    (o) => [o.value !== "REGULAR_CAVE", o.text],
  );

  return (
    <Select {...remainingProps} onChange={(_, value) => onChange?.(value)}>
      {sortedOptions.map(({ value, text }) => (
        <Option key={value} value={value}>
          {text}
        </Option>
      ))}
    </Select>
  );
};

export default CaveNameSelect;
