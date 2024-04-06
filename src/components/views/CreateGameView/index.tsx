import { useContext } from "react";
import { useLocation } from "wouter";

import { Box } from "@mui/joy";

import { CreateGamePayload, createGame } from "@/components/actions/game";
import View from "@/components/common/View";
import GameContext from "@/components/contexts/GameContext";

import CreateGameCard from "./components/CreateGameCard";
import Header from "./components/Header";

const CreateGameView = () => {
  const [, navigate] = useLocation();
  const { dispatch } = useContext(GameContext);

  const handleSubmit = (values: CreateGamePayload) => {
    dispatch(createGame(values));
    navigate("/forest");
  };

  return (
    <View header={<Header />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <CreateGameCard onSubmit={handleSubmit} />
      </Box>
    </View>
  );
};

export default CreateGameView;
