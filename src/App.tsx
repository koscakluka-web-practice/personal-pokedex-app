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
  const [user, setUser] = React.useState<{ favouritePokemon: number } | null>(
    null
  );
  const { auth } = React.useContext(authContext);

  React.useEffect(() => {
    if (auth?.data) {
      const users: Users = new Map(
        Object.entries(JSON.parse(window.localStorage.getItem("users") || "{}"))
      );
      let { favouritePokemon } = users.get(auth.data);
      setUser({ favouritePokemon });
      console.log(user);
    }
  }, [auth.data]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/pokemon" element={<PokemonList />}>
          <Route
            path=":pokemonId"
            element={<PokemonProfile user={user} setUser={setUser} />}
          />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
