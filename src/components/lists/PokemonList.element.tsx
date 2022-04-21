import React from "react";
import { NavLink } from "react-router-dom";

import PokemonApi, {
  PokemonListElement as PokemonListElementType,
} from "@utilities/models/pokemon";

interface PokemonListElementProps {
  pokemon: PokemonListElementType;
}

const PokemonListElement: React.FunctionComponent<PokemonListElementProps> = ({
  pokemon,
}) => {
  const { name, url } = pokemon;
  return (
    <NavLink to={name} key={name}>
      <li
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "5px",
          width: "100px",
          height: "50px",
        }}
      >
        {name}
      </li>
    </NavLink>
  );
};

export default PokemonListElement;
