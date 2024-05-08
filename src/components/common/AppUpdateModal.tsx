import { FormattedMessage } from "react-intl";
import { useRegisterSW } from "virtual:pwa-register/react";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";

const AppUpdateModal = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleRefresh = () => {
    updateServiceWorker();
  };

  const handleClose = () => {
    setNeedRefresh(false);
  };

  return (
    <Modal open={needRefresh} onClose={handleClose}>
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
          <Button color="primary" onClick={handleRefresh}>
            <FormattedMessage
              id="AppUpdateModal.updateNow"
              defaultMessage="Update now"
            />
          </Button>
          <Button color="neutral" variant="soft" onClick={handleClose}>
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
