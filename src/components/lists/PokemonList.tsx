import React from "react";

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
  return (
    <ul>
      {pokemonList.map((pokemon: { name: string; url: string }) => (
        <PokemonListElement pokemon={pokemon} />
      ))}
      <li>
        <span onClick={handleLoadMore}>Load more...</span>
      </li>
    </ul>
  );
};

export default PokemonList;
