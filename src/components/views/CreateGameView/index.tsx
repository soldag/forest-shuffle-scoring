import { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "wouter";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Button, Stack } from "@mui/joy";

import { CreateGamePayload, createGame } from "@/actions/game";
import AppUpdateModal from "@/components/common/AppUpdateModal";
import View from "@/components/common/View";
import AppUpdateContext from "@/components/contexts/AppUpdateContext";
import GameContext from "@/components/contexts/GameContext";

import CreateGameCard from "./components/CreateGameCard";
import Header from "./components/Header";

const CreateGameView = () => {
  const [, navigate] = useLocation();
  const { dispatch } = useContext(GameContext);
  const { checkForUpdate } = useContext(AppUpdateContext);

  useEffect(() => {
    const handle = setTimeout(() => checkForUpdate(), 1000);
    return () => clearTimeout(handle);
  }, [checkForUpdate]);

  const handleSubmit = (values: CreateGamePayload) => {
    dispatch(createGame(values));
    navigate("/forest");
  };

  return (
    <View header={<Header />}>
      <Stack direction="column" sx={{ minHeight: "100%" }}>
        <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
          <CreateGameCard onSubmit={handleSubmit} />
        </Stack>

        <Button
          variant="plain"
          color="primary"
          startDecorator={<InfoOutlinedIcon />}
          component={Link}
          to="/about"
        >
          <FormattedMessage
            id="CreateGameView.about"
            defaultMessage="About this app"
          />
        </Button>
      </Stack>

      <AppUpdateModal />
    </View>
  );
};

export default CreateGameView;
