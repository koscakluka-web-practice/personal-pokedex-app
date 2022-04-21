import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { authContext } from "@contexts/AuthContext";
import Users, { User } from "@utilities/models/users";
import {
  PokemonProfile,
  BasicModal,
  FavouritePokemonSelectionForm,
} from "@components";

import PokemonApi, { Pokemon, PokemonType } from "@utilities/models/pokemon";

import { POKEMON_LIST_PAGE_PATH } from "@utilities/constants/paths";

interface PokemonProfilePageProps {}

const PokemonProfilePage: React.FunctionComponent<PokemonProfilePageProps> = (
  props
) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { auth } = React.useContext(authContext);
  const navigate = useNavigate();

  let { pokemonId } = useParams();

  useEffect(() => {
    async function getPokemon() {
      if (pokemonId) {
        const pokemon = await PokemonApi.get(pokemonId);
        setPokemon(pokemon);
      }
    }
    getPokemon();
  }, [pokemonId]);

  const closeProfile = () => {
    navigate(POKEMON_LIST_PAGE_PATH);
  };

  const updateFavouritePokemon = (pokemonId: string | number) => {
    if (auth?.data) {
      const user: User | null = Users.get(auth.data);
      if (user) {
        user.favouritePokemon = pokemonId;
        Users.update(user);
      }
    }
  };

  return (
    <BasicModal closeModal={closeProfile}>
      {pokemon ? (
        <React.Fragment>
          <PokemonProfile pokemon={pokemon} />
          {auth?.data ? (
            <FavouritePokemonSelectionForm
              id={pokemon.id}
              updateFavouritePokemon={updateFavouritePokemon}
            />
          ) : null}
        </React.Fragment>
      ) : (
        "No Pokemon"
      )}
    </BasicModal>
  );
};

export default PokemonProfilePage;
