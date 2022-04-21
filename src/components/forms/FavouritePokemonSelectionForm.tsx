import React from "react";

interface FavouritePokemonSelectionFormProps {
  id: string | number;
  updateFavouritePokemon: (id: string | number) => void;
}

const FavouritePokemonSelectionForm: React.FunctionComponent<
  FavouritePokemonSelectionFormProps
> = ({ id, updateFavouritePokemon }) => {
  return (
    <form>
      <button onClick={() => updateFavouritePokemon(id.toString())}>
        Make Favourite
      </button>
      <p style={{ fontSize: "0.6em", color: "gray" }}>
        This will replace your current favourite Pokemon
      </p>
    </form>
  );
};

export default FavouritePokemonSelectionForm;
