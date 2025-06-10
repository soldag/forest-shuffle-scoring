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

import CaveFormControls, {
  CaveFormControlsFields,
} from "@/components/common/CaveFormControls";
import { Cave, Game } from "@/game";
import { getForest } from "@/game/helpers";
import invariant from "@/utils/invariant";

interface CaveModalProps {
  open: boolean;
  game: Game;
  playerId: string;
  onConfirm: (cave: Cave) => void;
  onClose: () => void;
}

const getFormValues = (cave?: Cave) => ({
  caveName: cave?.name ?? "REGULAR_CAVE",
  caveCardCount: cave?.cardCount ?? 0,
});

const CaveModal = ({
  open,
  game,
  playerId,
  onConfirm,
  onClose,
}: CaveModalProps) => {
  const cave = getForest(game, playerId)?.cave;
  const form = useForm<CaveFormControlsFields>({
    mode: "onChange",
    defaultValues: getFormValues(cave),
  });
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = form;

  const nameOptions = useMemo(() => {
    const caveCards = cave ? [...game.deck.caves, cave] : game.deck.caves;
    return _.uniq(caveCards.map((c) => c.name));
  }, [game.deck.caves, cave]);

  useEffect(() => {
    if (!open) {
      reset(getFormValues(cave));
    }
  }, [open, reset, cave]);

  const handleConfirm = (values: CaveFormControlsFields) => {
    const newCave =
      values.caveName === cave?.name
        ? cave
        : game.deck.caves.find((c) => c.name === values.caveName);
    invariant(newCave);

    onConfirm?.({ ...newCave, cardCount: values.caveCardCount });
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleConfirm)}>
        <FormProvider {...form}>
          <ModalDialog size="lg" variant="outlined" role="alertdialog">
            <DialogTitle>
              <FormattedMessage
                id="ForestView.CaveModal.title"
                defaultMessage="Cave"
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

              <CaveFormControls nameOptions={nameOptions} />
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
        </FormProvider>
      </form>
    </Modal>
  );
};

export default CaveModal;
