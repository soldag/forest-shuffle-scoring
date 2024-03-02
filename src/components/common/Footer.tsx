import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Container, Stack } from "@mui/joy";

import { addPlayer } from "@/components/actions/game";
import AddPlayerModal from "@/components/common/AddPlayerModal";
import GameContext from "@/components/contexts/GameContext";

const Footer: React.FC = () => {
  const { game, dispatch } = useContext(GameContext);

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const handleAddPlayer = (values: { playerName: string }) =>
    dispatch(addPlayer(values));

  if (!game) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: "background.surface",
        borderTop: "1px solid",
        borderColor: "divider",
        boxShadow: "sm",
      }}
    >
      <Container sx={{ px: { xs: 0 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          sx={{
            p: 2,
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="soft"
            color="neutral"
            startDecorator={<PersonAddIcon />}
            onClick={() => setIsAddPlayerModalOpen(true)}
          >
            <FormattedMessage
              id="Footer.nextPlayer"
              defaultMessage="Next player"
            />
          </Button>
          <Button
            fullWidth
            startDecorator={<EmojiEventsIcon />}
            color="primary"
          >
            <FormattedMessage
              id="Footer.scoreGame"
              defaultMessage="Score game"
            />
          </Button>
        </Stack>
      </Container>

      <AddPlayerModal
        open={isAddPlayerModalOpen}
        onConfirm={handleAddPlayer}
        onClose={() => setIsAddPlayerModalOpen(false)}
      />
    </Box>
  );
};

export default Footer;
