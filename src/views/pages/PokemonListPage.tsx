import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { Outlet } from "react-router-dom";

import StandardLayout from "@layouts/StandardLayout";
import PokemonList from "@components/lists/PokemonList";

import PokemonApi, {
  PokemonList as PokemonListType,
} from "@utilities/models/pokemon";
import Logger from "@utilities/tools/Logger";

interface PokemonListPageProps {}

const PokemonListPage: React.FunctionComponent<PokemonListPageProps> = () => {
  const { data, status, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["pokemon-list"],
      async ({ pageParam = null }) => await PokemonApi.list(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  // Construct an object with loadMore information
  const loadMore = {
    loading: isFetching,
    hasMore: hasNextPage,
    loadMore: () => fetchNextPage(),
  };

  // Construct a pokemon list from pages
  let pokemonList: PokemonListType = [];
  if (data)
    data.pages.forEach((page) =>
      page.response.forEach((pokemon) => pokemonList.push(pokemon))
    );

  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(PokemonListPage.name);
  });

  return (
    <StandardLayout>
      <h1 className="center-content">Pokemon List</h1>
      {status == "loading" ? (
        <div className="center-content">Loading...</div>
      ) : status == "error" ? (
        <div className="center-content">Error...</div>
      ) : (
        <PokemonList pokemonList={pokemonList} loadMore={loadMore} />
      )}
      <Outlet />
    </StandardLayout>
  );
};

export default PokemonListPage;
