import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { Stack } from "@mui/joy";

import CaveCardCountInput from "@/components/common/CaveCardCountInput";
import CaveNameSelect from "@/components/common/CaveNameSelect";
import FormController from "@/components/common/FormController";
import { buildRules } from "@/utils/forms";

export interface CaveFormControlsFields {
  caveName: string;
  caveCardCount: number;
}

interface CaveFormControlsProps {
  nameOptions: string[];
}

const CaveFormControls = ({ nameOptions }: CaveFormControlsProps) => {
  const intl = useIntl();

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CaveFormControlsFields>();

  const name = useWatch({ control, name: "caveName" });

  useEffect(() => {
    if (nameOptions.length > 0 && !nameOptions.includes(name)) {
      setValue("caveName", nameOptions[0]);
    }
  }, [name, nameOptions, setValue]);

  return (
    <Stack gap={2}>
      {nameOptions.length > 1 && (
        <FormattedMessage
          id="ForestView.CaveFormControls.caveName.label"
          defaultMessage="Cave card"
        >
          {([label]) => (
            <FormController
              name="caveName"
              control={control}
              label={label}
              render={({ field }) => (
                <CaveNameSelect
                  {...field}
                  variant="soft"
                  placeholder={label as string}
                  options={nameOptions}
                />
              )}
            />
          )}
        </FormattedMessage>
      )}

      <FormattedMessage
        id="ForestView.CaveFormControls.count.label"
        defaultMessage="Number of cards in the cave"
      >
        {([label]) => (
          <FormController
            name="caveCardCount"
            control={control}
            rules={buildRules(intl, { required: true, min: 0 })}
            label={label}
            render={({ field }) => (
              <CaveCardCountInput
                {...field}
                variant="soft"
                placeholder={label as string}
                error={!!errors.caveCardCount}
              />
            )}
          />
        )}
      </FormattedMessage>
    </Stack>
  );
};

export default CaveFormControls;
