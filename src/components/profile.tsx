import * as React from "react";
import axios from "axios";
import { Component, useState, useEffect } from "react";

import PokemonApi, { Pokemon, PokemonType } from "../data/pokemon";
import Users, { User } from "../data/users";
import { authContext } from "../contexts/AuthContext";

interface ProfileProps {}

const Profile: React.FunctionComponent<ProfileProps> = () => {
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

  if (!pokemon) return <div>No pokemon</div>;

  console.log(pokemon);

  const { id, name, height, weight, types, sprite } = pokemon;
  return (
    <div>
      <h1>{name}</h1>
      <img src={sprite} />
      <p>
        Height: {height / 10.0} m | Weight: {weight / 10.0} kg
      </p>
      {types.map((t: PokemonType) => (
        <span key={t.slot}>{t.type.name} </span>
      ))}
    </div>
  );
};

export default Profile;
