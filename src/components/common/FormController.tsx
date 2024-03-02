import { ReactNode } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import ReportIcon from "@mui/icons-material/Report";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";

interface FormControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
  label?: ReactNode;
}

const FormController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  render,
  ...remainingProps
}: FormControllerProps<TFieldValues, TName>) => (
  <Controller
    {...remainingProps}
    render={({ fieldState, ...otherArgs }) => (
      <FormControl error={!!fieldState.error}>
        {label && <FormLabel>{label}</FormLabel>}
        {render({ fieldState, ...otherArgs })}
        {fieldState.error && (
          <FormHelperText>
            <ReportIcon sx={{ mr: 1 }} />
            {fieldState.error.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

export default FormController;
