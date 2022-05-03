import React from "react";

import { Pokemon, PokemonType } from "@utilities/models/pokemon";

import "./PokemonProfile.css";

interface PokemonProfileProps {
  pokemon: Pokemon;
}

const PokemonProfile: React.FunctionComponent<PokemonProfileProps> = ({
  pokemon,
}) => {
  const { name, height, weight, types, sprite } = pokemon;
  return (
    <div className="pokemon-profile">
      <h1 className="title">{name}</h1>
      <img className="pure-img" src={sprite} />
      <div className="pokemon-stats">
        <span>Height: {height / 10.0} m</span>
        <span>Weight: {weight / 10.0} kg</span>
      </div>
      Types:
      <ul className="label-list">
        {types.map((t: PokemonType) => (
          <li key={t.slot}>{t.type.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonProfile;
