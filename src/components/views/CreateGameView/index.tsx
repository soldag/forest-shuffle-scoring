import { useContext } from "react";

import { Container } from "@mui/joy";

import { createGame } from "@/components/actions/game";
import View from "@/components/common/View";
import GameContext from "@/components/contexts/GameContext";

import CreateGameCard, {
  CreateGameCardFields,
} from "./components/CreateGameCard";
import Header from "./components/Header";

const CreateGameView = () => {
  const { dispatch } = useContext(GameContext);

  const handleSubmit = (values: CreateGameCardFields) =>
    dispatch(createGame(values));

  return (
    <View header={<Header />}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <CreateGameCard onSubmit={handleSubmit} />
      </Container>
    </View>
  );
};

export default CreateGameView;
