import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

import EditIcon from "@mui/icons-material/Edit";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Box, DialogContent, DialogTitle, ModalClose, Stack } from "@mui/joy";

import OptionsBar from "@/components/common/OptionsBar";
import ResponsiveDrawer from "@/components/common/ResponsiveDrawer";
import { Game, Player } from "@/game";
import { useHasCamera } from "@/utils/hooks";

import ImportPane from "./ImportPane";
import ManualPane from "./ManualPane";

enum AddPlayerMode {
  MANUAL = "manual",
  IMPORT = "import",
}

interface AddPlayerDrawerProps {
  open: boolean;
  game: Game;
  onConfirm: (player: Player) => void;
  onClose: () => void;
}

const AddPlayerDrawer = ({
  open = false,
  game,
  onConfirm,
  onClose,
}: AddPlayerDrawerProps) => {
  const hasCamera = useHasCamera();

  const manualPaneRef = useRef<HTMLDivElement>(null);
  const importPaneRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<AddPlayerMode>(AddPlayerMode.MANUAL);

  const handleChangeMode = (newMode: AddPlayerMode) => {
    setMode(newMode);

    const newPaneRef =
      newMode === AddPlayerMode.MANUAL ? manualPaneRef : importPaneRef;
    newPaneRef.current?.scrollIntoView();
  };

  const handleSubmit = (player: Player) => {
    onConfirm?.(player);
    onClose?.();
  };

  const handleClose = () => {
    setMode(AddPlayerMode.MANUAL);
    onClose?.();
  };

  useEffect(() => {
    if (open) {
      handleChangeMode(AddPlayerMode.MANUAL);
    }
  }, [open]);

  return (
    <ResponsiveDrawer open={open} onClose={handleClose}>
      <ModalClose />

      <DialogTitle>
        <FormattedMessage
          id="AddPlayerDrawer.title"
          defaultMessage="Add player"
        />
      </DialogTitle>

      <DialogContent sx={{ m: 1.5 }}>
        {hasCamera && (
          <OptionsBar value={mode} onChange={handleChangeMode} sx={{ mb: 2 }}>
            <OptionsBar.Option icon={<EditIcon />} value={AddPlayerMode.MANUAL}>
              <FormattedMessage
                id="AddPlayerDrawer.mode.manual"
                defaultMessage="Enter details"
              />
            </OptionsBar.Option>
            <OptionsBar.Option
              icon={<QrCodeScannerIcon />}
              value={AddPlayerMode.IMPORT}
            >
              <FormattedMessage
                id="AddPlayerDrawer.mode.import"
                defaultMessage="Scan QR code"
              />
            </OptionsBar.Option>
          </OptionsBar>
        )}
        <Box sx={{ overflow: "hidden" }}>
          <Stack direction="row" sx={{ width: "200%" }}>
            <Box ref={manualPaneRef} sx={{ flexGrow: 1, flexBasis: 0 }}>
              <ManualPane
                game={game}
                isActive={open && mode === AddPlayerMode.MANUAL}
                onSubmit={handleSubmit}
              />
            </Box>
            <Box ref={importPaneRef} sx={{ flexGrow: 1, flexBasis: 0 }}>
              <ImportPane
                game={game}
                isActive={open && mode === AddPlayerMode.IMPORT}
                onSubmit={handleSubmit}
              />
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </ResponsiveDrawer>
  );
};

export default AddPlayerDrawer;
