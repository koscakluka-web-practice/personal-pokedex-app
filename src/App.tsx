import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import {
  Header,
  Footer,
  Login,
  Profile,
  PokemonList,
  PokemonProfile,
} from "./components";

import "./App.css";
import Users, { authContext } from "./contexts/AuthContext";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/pokemon" element={<PokemonList />}>
          <Route path=":pokemonId" element={<PokemonProfile />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
