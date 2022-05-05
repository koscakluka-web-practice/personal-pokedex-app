import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Logger from "@utilities/tools/Logger";

import { authContext } from "@contexts/AuthContext";
import Users, { User } from "@utilities/models/users";
import {
  PokemonProfile,
  BasicModal,
  FavouritePokemonSelectionForm,
} from "@components";

import PokemonApi, { Pokemon, PokemonType } from "@utilities/models/pokemon";

import { POKEMON_LIST_PAGE_PATH } from "@utilities/constants/paths";
import { USER_PROFILE_PAGE_PATH } from "@utilities/constants/paths";
import { useQuery } from "react-query";

interface PokemonProfilePageProps {}

const PokemonProfilePage: React.FunctionComponent<PokemonProfilePageProps> = (
  props
) => {
  const { auth } = React.useContext(authContext);
  const navigate = useNavigate();

  let { pokemonId } = useParams();

  const { data, status } = useQuery(
    ["pokemon", pokemonId],
    async ({ queryKey }) => await PokemonApi.get(queryKey[1])
  );

  const closeProfile = () => {
    navigate(POKEMON_LIST_PAGE_PATH);
  };

  const updateFavouritePokemon = (pokemonId: string | number) => {
    if (auth?.data) {
      const user: User | null = Users.get(auth.data);
      if (user) {
        user.email = auth.data;
        user.favouritePokemon = pokemonId;
        Users.update(user);
        navigate(USER_PROFILE_PAGE_PATH);
      }
    }
  };

  //Render Log
  React.useEffect(() => {
    Logger.logComponentRender(PokemonProfilePage.name);
  });

  return (
    <BasicModal closeModal={closeProfile}>
      {status === "loading" ? (
        <div className="center-content">Loading...</div>
      ) : status === "error" ? (
        <div className="center-content">Error...</div>
      ) : (
        <React.Fragment>
          <PokemonProfile pokemon={data} />
          {auth?.data ? (
            <FavouritePokemonSelectionForm
              id={data.id}
              updateFavouritePokemon={updateFavouritePokemon}
            />
          ) : null}
        </React.Fragment>
      )}
    </BasicModal>
  );
};

export default PokemonProfilePage;
