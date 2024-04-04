import { Redirect, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

import CreateGameView from "@/components/views/CreateGameView";
import ForestView from "@/components/views/ForestView";
import ScoringView from "@/components/views/ScoringView";

const RootContainer: React.FC = () => (
  <Router hook={useHashLocation}>
    <Route path="/new" component={CreateGameView} />
    <Route path="/forest" component={ForestView} />
    <Route path="/scoring" component={ScoringView} />

    <Redirect to="/new" />
  </Router>
);

export default RootContainer;
