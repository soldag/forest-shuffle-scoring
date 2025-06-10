import * as _ from "lodash-es";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { Cave, Game } from "@/game";

interface AddPlayerModalFields {
  playerName: string;
  cave: Cave;
}

interface AddPlayerModalProps {
  open: boolean;
  game: Game;
  onConfirm: (values: AddPlayerModalFields) => void;
  onClose: () => void;
}

const AddPlayerModal = ({
  open = false,
  game,
  onConfirm,
  onClose,
}: AddPlayerModalProps) => {
  const form = useForm<AddPlayerFormFields>({
    mode: "onChange",
    defaultValues: {
      playerName: "",
      caveName: "REGULAR_CAVE",
      caveCardCount: 0,
    },
  });
  const {
    formState: { isValid },
    reset,
    handleSubmit,
  } = form;

  const caveNameOptions = useMemo(
    () => _.uniq(game.deck.caves.map((c) => c.name)),
    [game.deck.caves],
  );

  const handleConfirm = (values: AddPlayerFormFields) => {
    const cave = game.deck.caves.find((c) => c.name === values.caveName);
    if (!cave) {
      return;
    }

    onConfirm?.({
      playerName: values.playerName,
      cave: {
        ...cave,
        cardCount: values.caveCardCount,
      },
    });
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

          <FormProvider {...form}>
            <AddPlayerForm
              caveNameOptions={caveNameOptions}
              existingPlayers={game.players}
              onSubmit={handleSubmit(handleConfirm)}
            />
          </FormProvider>
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
