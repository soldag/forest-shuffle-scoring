import { useContext } from "react";

import { Container } from "@mui/joy";

import { createGame } from "@/components/actions/game";
import View from "@/components/common/View";
import GameContext from "@/components/contexts/GameContext";

import CreateGameCard from "./components/CreateGameCard";
import Header from "./components/Header";

const CreateGameView = () => {
  const { dispatch } = useContext(GameContext);

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
        <CreateGameCard onSubmit={(values) => dispatch(createGame(values))} />
      </Container>
    </View>
  );
};

export default CreateGameView;
