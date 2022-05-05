import axios from "axios";

export const DEFAULT_PAGE_SIZE = 20;

/**
 * The interface that describes the PokemonType from Pokemon endpoint
 * (https://pokeapi.co/docs/v2#pokemon)
 */
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

/**
 * The interface that describes the reduced Pokemon from Pokemon endpoint
 * (https://pokeapi.co/docs/v2#pokemon)
 */
export interface Pokemon {
  id: number | string;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprite: string;
}

/**
 * The interface that describes the Pokemon from Pokemon endpoint when no id or
 * name is provided (https://pokeapi.co/docs/v2#pokemon)
 */
export interface PokemonListElement {
  name: string;
  url: string;
}

/**
 * The interface that describes the Pokemon from Pokemon endpoint when no id or
 * name is provided (https://pokeapi.co/docs/v2#pokemon)
 */
export interface PokemonList {
  [response: number]: { name: string; url: string };
}

/**
 * A class that collects all the access points to pokeapi as static methods
 */
class PokemonApi {
  /**
   * A private variable that that contains the object used to access pokeapi
   */
  static pokeapi_: any = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon",
  });

  /**
   * Lists the Pokemon
   * @param nextPage String URL to the next page of Pokemon list
   * TODO...
   */
  static list = async (
    nextPage: string | null
  ): Promise<{ response: PokemonList; nextPage: string }> => {
    const parameters = nextPage
      ? "?" + nextPage.split("?")[1]
      : `?limit=${DEFAULT_PAGE_SIZE}`;
    const response = await PokemonApi.pokeapi_.get(parameters);

    return { response: response.data.results, nextPage: response.data.next };
  };

  /**
   * Gets a Pokemon based on the provided ID
   * @param pokemonId The ID of requested Pokemon
   * @returns Pokemon object matching the provided ID
   */
  static get = async (pokemonId: string | number): Promise<Pokemon> => {
    const response = await PokemonApi.pokeapi_.get("/" + pokemonId);

    const { id, name, height, weight, types, sprites } = response.data;
    const pokemon = {
      id,
      name,
      height,
      weight,
      types,
      sprite: sprites.front_default,
    };
    return pokemon;
  };
}

export default PokemonApi;
