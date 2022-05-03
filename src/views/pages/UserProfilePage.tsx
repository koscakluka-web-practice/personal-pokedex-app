import React, { useState, useEffect } from "react";

import Logger from "@utilities/tools/Logger";

import { authContext } from "@contexts/AuthContext";

import PokemonApi, { Pokemon } from "@utilities/models/pokemon";
import Users, { User } from "@utilities/models/users";

import { StandardLayout } from "@views";
import { PokemonProfile } from "@components";

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { auth } = React.useContext(authContext);

  useEffect(() => {
    async function getPokemon() {
      if (auth?.data) {
        const user: User | null = Users.get(auth.data);
        if (user) {
          const favouritePokemonId = user.favouritePokemon;
          if (favouritePokemonId) {
            setPokemon(await PokemonApi.get(favouritePokemonId.toString()));
          }
        }
      }
    }
    getPokemon();
  }, []);

  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(UserProfilePage.name);
  });

  return (
    <StandardLayout center>
      <div>
        <h1 className="center-content"> Favourite Pokemon</h1>
        {pokemon ? (
          <PokemonProfile pokemon={pokemon} />
        ) : (
          <div className="center-content">No Pokemon</div>
        )}
      </div>
    </StandardLayout>
  );
};

export default UserProfilePage;
