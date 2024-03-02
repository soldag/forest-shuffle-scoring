import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";

import FormController from "@/components/common/FormController";
import { MAX_PLAYER_NAME_LENGTH } from "@/utils/constants";
import { buildRules } from "@/utils/forms";

interface AddPlayerModalProps {
  open: boolean;
  onConfirm: (values: { playerName: string }) => void;
  onClose: () => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  open = false,
  onConfirm,
  onClose,
}) => {
  const intl = useIntl();

  const {
    control,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      playerName: "",
    },
  });

  const handleConfirm = (values: { playerName: string }) => {
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
      <form onSubmit={handleSubmit(handleConfirm)}>
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
                defaultMessage="Please enter the name of the player you want to add."
              />
            </Typography>
            <FormattedMessage
              id="AddPlayerModal.playerName.label"
              defaultMessage="Name"
            >
              {([label]) => (
                <FormController
                  name="playerName"
                  control={control}
                  rules={buildRules(intl, {
                    required: true,
                    maxLength: MAX_PLAYER_NAME_LENGTH,
                  })}
                  label={label}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      variant="soft"
                      startDecorator={<PersonIcon />}
                      placeholder={label as string}
                      error={!!errors.playerName}
                      slotProps={{
                        input: {
                          maxLength: MAX_PLAYER_NAME_LENGTH,
                        },
                      }}
                    />
                  )}
                />
              )}
            </FormattedMessage>
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary" disabled={!isValid}>
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
      </form>
    </Modal>
  );
};

export default AddPlayerModal;
