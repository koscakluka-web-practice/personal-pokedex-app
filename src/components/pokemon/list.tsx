import * as React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const pokemonApi: any = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

interface PokemonListProps {}

const PokemonList: React.FunctionComponent<PokemonListProps> = () => {
  const [pokemon, setPokemon]: [any, any] = useState(null);
  const [limit, setLimit]: [number, any] = useState(50);

  useEffect(() => {
    async function getPokemon() {
      const response = await pokemonApi.get("?limit=" + limit);
      setPokemon(response.data.results);
    }
    getPokemon();
  }, [limit]);

  let handleLoadMore = () => {
    setLimit(limit + 50);
  };

  if (!pokemon) return <div>No pokemon</div>;

  return (
    <React.Fragment>
      <ul>
        {pokemon.map((t: { name: string; url: string }) => (
          <NavLink to={t.name} key={t.name}>
            <li style={{ textTransform: "capitalize" }}>{t.name}</li>
          </NavLink>
        ))}
      </ul>
      <span onClick={handleLoadMore}>Load more...</span>
      <Outlet />
    </React.Fragment>
  );
};

export default PokemonList;
