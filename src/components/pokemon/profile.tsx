import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Users, { authContext } from "../../contexts/AuthContext";

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

interface PokemonProfileProps {
  user: any;
  setUser: any;
}

const PokemonProfile: React.FunctionComponent<PokemonProfileProps> = (
  props
) => {
  const [pokemon, setPokemon]: [any, any] = useState(null);
  const { auth } = React.useContext(authContext);
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

  const updateFavouritePokemon = (pokemonId: string) => {
    props.setUser({ ...props.user, favouritePokemon: pokemonId });
    let users: Users = new Map(
      Object.entries(JSON.parse(window.localStorage.getItem("users") || "{}"))
    );
    let user = users.get(auth?.data);
    user.favouritePokemon = pokemonId;
    users.set(auth?.data, user);
    window.localStorage.setItem(
      "users",
      JSON.stringify(Object.fromEntries(users))
    );
  };

  console.log(pokemon);
  let body = <div />;
  if (!pokemon) {
    body = <div>No pokemon</div>;
  } else {
    const { id, name, height, weight, types } = pokemon;
    const sprite: string = pokemon.sprites.front_default;
    console.log(props);
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
          {props.user ? (
            <React.Fragment>
              <button onClick={() => updateFavouritePokemon(pokemonId)}>
                Make Favourite
              </button>
              <p style={{ fontSize: "0.6em", color: "gray" }}>
                This will replace your current favourite Pokemon
              </p>
            </React.Fragment>
          ) : null}
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
