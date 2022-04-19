import * as React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import PokemonApi, { PokemonList as PokemonListType } from "../../data/pokemon";

const pokemonApi: any = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

interface PokemonListProps {}

const PokemonList: React.FunctionComponent<PokemonListProps> = () => {
  const [pokemonList, setPokemon] = useState<PokemonListType | null>(null);
  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    const getPokemon = async () => {
      setPokemon(await PokemonApi.list(lastPage));
    };
    getPokemon();
  }, [lastPage]);

  let handleLoadMore = () => {
    setLastPage(lastPage + 1);
  };

  if (!pokemonList) return <div>No pokemon</div>;

  console.log(pokemonList);

  return (
    <React.Fragment>
      <ul>
        {pokemonList.map((t: { name: string; url: string }) => (
          <NavLink to={t.name} key={t.name}>
            <li
              style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "5px",
                width: "100px",
                height: "50px",
              }}
            >
              {t.name}
            </li>
          </NavLink>
        ))}
      </ul>
      <span onClick={handleLoadMore}>Load more...</span>
      <Outlet />
    </React.Fragment>
  );
};

export default PokemonList;
