import React from "react";

import Logger from "@utilities/tools/Logger";

import PokemonListElement from "./PokemonList.element";

import PokemonApi, {
  PokemonList as PokemonListType,
} from "@utilities/models/pokemon";

interface PokemonListProps {
  pokemonList: PokemonListType;
  handleLoadMore: () => void;
}

const PokemonList: React.FunctionComponent<PokemonListProps> = ({
  pokemonList,
  handleLoadMore,
}) => {
  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(PokemonList.name);
  });

  return (
    <ul className="label-list">
      {pokemonList.map((pokemon: { name: string; url: string }) => (
        <PokemonListElement pokemon={pokemon} />
      ))}
      <a className="load-more" href="#" onClick={handleLoadMore}>
        <li>Load more...</li>
      </a>
    </ul>
  );
};

export default PokemonList;
