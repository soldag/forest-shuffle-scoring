import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";

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

import AddPlayerForm, {
  AddPlayerFormFields,
} from "@/components/common/AddPlayerForm";

interface AddPlayerModalProps {
  open: boolean;
  existingPlayerNames: string[];
  onConfirm: (values: AddPlayerFormFields) => void;
  onClose: () => void;
}

const AddPlayerModal = ({
  open = false,
  existingPlayerNames,
  onConfirm,
  onClose,
}: AddPlayerModalProps) => {
  const {
    control,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      playerName: "",
      caveCardCount: 0,
    },
  });

  const handleConfirm = (values: AddPlayerFormFields) => {
    onConfirm?.(values);
    onClose?.();
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg" variant="outlined" role="alertdialog">
        <DialogTitle>
          <FormattedMessage
            id="AddPlayerModal.title"
            defaultMessage="Add player"
          />
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            <FormattedMessage
              id="AddPlayerModal.instructions"
              defaultMessage="Please enter the name of the player you want to add and the number of cards they have in their cave."
            />
          </Typography>

          <AddPlayerForm
            control={control}
            errors={errors}
            existingPlayerNames={existingPlayerNames}
            onSubmit={handleSubmit(handleConfirm)}
          />
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            disabled={!isValid}
            onClick={handleSubmit(handleConfirm)}
          >
            <FormattedMessage
              id="AddPlayerModal.confirm"
              defaultMessage="Add"
            />
          </Button>
          <Button color="neutral" variant="soft" onClick={onClose}>
            <FormattedMessage
              id="AddPlayerModal.cancel"
              defaultMessage="Cancel"
            />
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default AddPlayerModal;
