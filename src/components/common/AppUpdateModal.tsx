import { useContext } from "react";
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

import AppUpdateContext from "@/components/contexts/AppUpdateContext";

const AppUpdateModal = () => {
  const { isUpdateAvailable, applyUpdate, rejectUpdate } =
    useContext(AppUpdateContext);

  return (
    <Modal open={isUpdateAvailable} onClose={rejectUpdate}>
      <ModalDialog size="sm" variant="outlined" role="alertdialog">
        <DialogTitle>
          <FormattedMessage
            id="AppUpdateModal.title"
            defaultMessage="New update available"
          />
        </DialogTitle>

        <Divider />

        <DialogContent>
          <FormattedMessage
            id="AppUpdateModal.text"
            defaultMessage="There's an update available for this app. For installing it, the app needs to be restarted."
          />
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={applyUpdate}>
            <FormattedMessage
              id="AppUpdateModal.updateNow"
              defaultMessage="Update now"
            />
          </Button>
          <Button color="neutral" variant="soft" onClick={rejectUpdate}>
            <FormattedMessage
              id="AppUpdateModal.updateLater"
              defaultMessage="Later"
            />
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default AppUpdateModal;
