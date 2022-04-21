import React from "react";

import { Pokemon, PokemonType } from "@utilities/models/pokemon";

interface PokemonProfileProps {
  pokemon: Pokemon;
}

const PokemonProfile: React.FunctionComponent<PokemonProfileProps> = ({
  pokemon,
}) => {
  const { name, height, weight, types, sprite } = pokemon;
  return (
    <div>
      <h1>{name}</h1>
      <img src={sprite} />
      <p>
        Height: {height / 10.0} m | Weight: {weight / 10.0} kg
      </p>
      {types.map((t: PokemonType) => (
        <span key={t.slot}>{t.type.name} </span>
      ))}
    </div>
  );
};

export default PokemonProfile;
