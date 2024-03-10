import { useContext } from "react";

import { Container } from "@mui/joy";

import { createGame } from "@/components/actions/game";
import View from "@/components/common/View";
import GameContext from "@/components/contexts/GameContext";

import CreateGameForm, {
  CreateGameFormFields,
} from "./components/CreateGameForm";
import Header from "./components/Header";

const CreateGameView = () => {
  const { dispatch } = useContext(GameContext);

  const handleSubmit = (values: CreateGameFormFields) =>
    dispatch(createGame(values));

  return (
    <View header={<Header />}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CreateGameForm onSubmit={handleSubmit} />
      </Container>
    </View>
  );
};

export default CreateGameView;
