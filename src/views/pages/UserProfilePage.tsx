import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import Logger from "@utilities/tools/Logger";

import { authContext } from "@contexts/AuthContext";

import PokemonApi, { Pokemon } from "@utilities/models/pokemon";
import Users, { User } from "@utilities/models/users";

import { StandardLayout } from "@views";
import { PokemonProfile } from "@components";

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
  const { auth } = React.useContext(authContext);

  const pokemonId: string = Users.get(auth.data)?.favouritePokemon;

  const { data, status } = useQuery(
    ["pokemon", pokemonId],
    async ({ queryKey }) => await PokemonApi.get(queryKey[1])
  );

  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(UserProfilePage.name);
  });

  return (
    <StandardLayout center>
      <div>
        <h1 className="center-content"> Favourite Pokemon</h1>
        {status === "loading" ? (
          <div className="center-content">Loading...</div>
        ) : status === "error" ? (
          <div className="center-content">Error...</div>
        ) : (
          <PokemonProfile pokemon={data} />
        )}
      </div>
    </StandardLayout>
  );
};

export default UserProfilePage;
