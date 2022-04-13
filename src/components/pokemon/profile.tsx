import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypes;
  sprite: string;
}

const pokemonApi: any = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

interface PokemonProfileProps {}

const PokemonProfile: React.FunctionComponent<PokemonProfileProps> = () => {
  const [pokemon, setPokemon]: [any, any] = useState(null);
  const navigate = useNavigate();

  let { pokemonId } = useParams();

  useEffect(() => {
    async function getPokemon() {
      console.log(pokemonId);
      const response = await pokemonApi.get(pokemonId);
      setPokemon(response.data);
    }
    getPokemon();
  }, [pokemonId]);

  const closeProfile = () => {
    navigate("/pokemon");
  };

  console.log(pokemon);
  let body = <div />;
  if (!pokemon) {
    body = <div>No pokemon</div>;
  } else {
    const { id, name, height, weight, types } = pokemon;
    const sprite: string = pokemon.sprites.front_default;

    body = (
      <React.Fragment>
        <div className="titleCloseBtn">
          <button onClick={closeProfile}>X</button>
        </div>
        <div className="title">
          <h1>{name}</h1>
        </div>
        <div className="body">
          <img src={sprite} />
          <p>
            Height: {height / 10.0} m | Weight: {weight / 10.0} kg
          </p>
          {types.map((t: PokemonTypes) => (
            <span key={t.slot}>{t.type.name} </span>
          ))}
        </div>
        <div className="footer">
          <button>Make Favourite</button>
          <p style={{ fontSize: "0.6em", color: "gray" }}>
            This will replace your current favourite Pokemon
          </p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="modalSpace">
      <div className="modalBackground" onClick={closeProfile} />
      <div className="modalContainer">{body}</div>
    </div>
  );
};

export default PokemonProfile;
