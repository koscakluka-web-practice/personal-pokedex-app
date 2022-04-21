import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import StandardLayout from "@layouts/StandardLayout";
import PokemonList from "@components/lists/PokemonList";

import PokemonApi, {
  PokemonList as PokemonListType,
} from "@utilities/models/pokemon";

interface PokemonListPageProps {}

const PokemonListPage: React.FunctionComponent<PokemonListPageProps> = () => {
  const [pokemonList, setPokemon] = useState<PokemonList | null>(null);
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

  return (
    <StandardLayout>
      <PokemonList pokemonList={pokemonList} handleLoadMore={handleLoadMore} />
      <Outlet />
    </StandardLayout>
  );
};

export default PokemonListPage;
