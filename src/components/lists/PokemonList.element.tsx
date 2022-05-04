import React from "react";
import { NavLink } from "react-router-dom";

import Logger from "@utilities/tools/Logger";

import PokemonApi, {
  PokemonListElement as PokemonListElementType,
} from "@utilities/models/pokemon";

interface PokemonListElementProps {
  pokemon: PokemonListElementType;
}

const PokemonListElement: React.FunctionComponent<PokemonListElementProps> = ({
  pokemon,
}) => {
  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(PokemonListElement.name);
  });

  const { name, url } = pokemon;
  return (
    <NavLink to={name}>
      <li key={name}>{name}</li>
    </NavLink>
  );
};

export default PokemonListElement;
