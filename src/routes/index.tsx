import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import {
  PokemonProfilePage,
  PokemonListPage,
  LoginPage,
  UserProfilePage,
} from "@views";

import {
  LOGIN_PAGE_PATH,
  POKEMON_LIST_PAGE_PATH,
  POKEMON_PROFILE_PAGE_STUB,
  USER_PROFILE_PAGE_PATH,
} from "@utilities/constants/paths";

interface AppRoutesProps {}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PAGE_PATH} element={<LoginPage />} />
        <Route
          path={USER_PROFILE_PAGE_PATH}
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route path={POKEMON_LIST_PAGE_PATH} element={<PokemonListPage />}>
          <Route
            path={POKEMON_PROFILE_PAGE_STUB}
            element={<PokemonProfilePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
