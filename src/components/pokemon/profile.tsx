import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { authContext } from "../../contexts/AuthContext";
import Users, { User } from "../../data/users";
import PokemonApi, { Pokemon, PokemonType } from "../../data/pokemon";

interface PokemonProfileProps {}

const PokemonProfile: React.FunctionComponent<PokemonProfileProps> = (
  props
) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { auth } = React.useContext(authContext);
  const navigate = useNavigate();

  let { pokemonId } = useParams();

  useEffect(() => {
    async function getPokemon() {
      if (pokemonId) {
        const pokemon = await PokemonApi.get(pokemonId);
        setPokemon(pokemon);
      }
    }
    getPokemon();
  }, [pokemonId]);

  const closeProfile = () => {
    navigate("/pokemon");
  };

  const updateFavouritePokemon = (pokemonId: string) => {
    if (auth?.data) {
      const user: User | null = Users.get(auth.data);
      if (user) {
        user.favouritePokemon = pokemonId;
        Users.update(user);
      }
    }
  };

  console.log(pokemon);
  let body = <div />;
  if (!pokemon) {
    body = <div>No pokemon</div>;
  } else {
    const { id, name, height, weight, types, sprite } = pokemon;
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
          {types.map((t: PokemonType) => (
            <span key={t.slot}>{t.type.name} </span>
          ))}
        </div>
        <div className="footer">
          {auth?.data ? (
            <React.Fragment>
              <button onClick={() => updateFavouritePokemon(id.toString())}>
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
