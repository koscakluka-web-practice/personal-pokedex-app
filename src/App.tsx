import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Header,
  Footer,
  Login,
  Profile,
  PokemonList,
  PokemonProfile,
} from "./components";

import "./App.css";

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  state = { user: { favPokemonId: 6 } };

  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile user={this.state.user} />} />
          <Route path="/pokemon" element={<PokemonList />}>
            <Route path=":pokemonId" element={<PokemonProfile />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
