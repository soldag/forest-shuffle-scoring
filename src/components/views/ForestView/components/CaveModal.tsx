import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";

import CaveCardCountInput from "@/components/common/CaveCardCountInput";
import FormController from "@/components/common/FormController";
import { buildRules } from "@/utils/forms";

export interface CaveModalFields {
  count: number;
}

interface CaveModalProps {
  open: boolean;
  count: number;
  onConfirm: (values: CaveModalFields) => void;
  onClose: () => void;
}

const CaveModal: React.FC<CaveModalProps> = ({
  open,
  count,
  onConfirm,
  onClose,
}) => {
  const intl = useIntl();

  const {
    control,
    formState: { isValid, errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      count,
    },
  });

  useEffect(() => {
    if (!open) {
      setValue("count", count);
    }
  }, [open, setValue, count]);

  const handleConfirm = (values: CaveModalFields) => {
    onConfirm?.(values);
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleConfirm)}>
        <ModalDialog size="lg" variant="outlined" role="alertdialog">
          <DialogTitle>
            <FormattedMessage
              id="ForestView.CaveModal.title"
              defaultMessage="Cave cards"
            />
          </DialogTitle>

          <Divider />

          <DialogContent>
            <Typography level="body-sm" sx={{ mb: 2 }}>
              <FormattedMessage
                id="ForestView.CaveModal.instructions"
                defaultMessage="Please enter the number of cards that are in the current player's cave."
              />
            </Typography>
            <FormattedMessage
              id="ForestView.CaveModal.count.label"
              defaultMessage="Number of cave cards"
            >
              {([label]) => (
                <FormController
                  name="count"
                  control={control}
                  rules={buildRules(intl, { required: true, min: 0 })}
                  label={label}
                  render={({ field }) => (
                    <CaveCardCountInput
                      {...field}
                      autoFocus
                      variant="soft"
                      placeholder={label as string}
                      error={!!errors.count}
                    />
                  )}
                />
              )}
            </FormattedMessage>
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary" disabled={!isValid}>
              <FormattedMessage
                id="ForestView.CaveModal.confirm"
                defaultMessage="Confirm"
              />
            </Button>
            <Button color="neutral" variant="soft" onClick={onClose}>
              <FormattedMessage
                id="ForestView.CaveModal.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          </DialogActions>
        </ModalDialog>
      </form>
    </Modal>
  );
};

export default CaveModal;
