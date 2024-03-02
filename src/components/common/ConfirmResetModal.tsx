import React from "react";
import { FormattedMessage } from "react-intl";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";

interface ConfirmResetModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({
  open,
  onConfirm,
  onClose,
}) => (
  <Modal open={open} onClose={onClose}>
    <ModalDialog size="sm" variant="outlined" role="alertdialog">
      <DialogTitle>
        <FormattedMessage
          id="ConfirmResetModal.title"
          defaultMessage="Score a new game"
        />
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="ConfirmResetModal.text"
          defaultMessage="Do you really want to score a new game?"
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onConfirm}>
          <FormattedMessage id="ConfirmResetModal.yes" defaultMessage="Yes" />
        </Button>
        <Button color="neutral" variant="soft" onClick={onClose}>
          <FormattedMessage id="ConfirmResetModal.no" defaultMessage="No" />
        </Button>
      </DialogActions>
    </ModalDialog>
  </Modal>
);

export default ConfirmResetModal;
