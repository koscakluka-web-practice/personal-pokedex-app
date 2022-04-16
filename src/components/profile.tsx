import * as React from "react";
import axios from "axios";
import { Component, useState, useEffect } from "react";

interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number | string;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypes;
  sprite: string;
}

const pokemonApi: any = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

interface ProfileProps {
  user: any;
}

const Profile: React.FunctionComponent<ProfileProps> = (
  props: ProfileProps
) => {
  console.log(props);
  const [pokemon, setPokemon]: [any, any] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      console.log(props);
      const pokemonId = props.user?.favouritePokemon;
      if (pokemonId) {
        const response = await pokemonApi.get(pokemonId.toString());
        setPokemon(response.data);
      }
    }
    getPokemon();
  }, [props.user]);

  if (!pokemon) return <div>No pokemon</div>;

  console.log(pokemon);

  const { id, name, height, weight, types } = pokemon;
  const sprite: string = pokemon.sprites.front_default;

  return (
    <div>
      <h1>{name}</h1>
      <img src={sprite} />
      <p>
        Height: {height / 10.0} m | Weight: {weight / 10.0} kg
      </p>
      {types.map((t: PokemonTypes) => (
        <span key={t.slot}>{t.type.name} </span>
      ))}
    </div>
  );
};

export default Profile;
