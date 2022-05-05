import React from "react";

import Logger from "@utilities/tools/Logger";

import PokemonListElement from "./PokemonList.element";

import PokemonApi, {
  PokemonList as PokemonListType,
} from "@utilities/models/pokemon";

interface PokemonListProps {
  pokemonList: PokemonListType;
  loadMore: { loading: boolean; hasMore: boolean; loadMore: () => void };
}

const PokemonList: React.FunctionComponent<PokemonListProps> = ({
  pokemonList,
  loadMore,
}) => {
  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(PokemonList.name);
  });

  return (
    <ul className="label-list">
      {pokemonList.map((pokemon: { name: string; url: string }) => (
        <PokemonListElement pokemon={pokemon} key={pokemon.name} />
      ))}
      {loadMore.hasMore ? (
        <a
          className="load-more"
          href="#"
          onClick={!loadMore.loading ? loadMore.loadMore : () => {}}
        >
          <li>{loadMore.loading ? "Loading..." : "Load more..."}</li>
        </a>
      ) : null}
    </ul>
  );
};

export default PokemonList;
