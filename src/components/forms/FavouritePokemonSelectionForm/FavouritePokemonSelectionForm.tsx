import React from "react";

import Logger from "@utilities/tools/Logger";

import "./FavouritePokemonSelectionForm.css";

interface FavouritePokemonSelectionFormProps {
  id: string | number;
  updateFavouritePokemon: (id: string | number) => void;
}

const FavouritePokemonSelectionForm: React.FunctionComponent<
  FavouritePokemonSelectionFormProps
> = ({ id, updateFavouritePokemon }) => {
  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(FavouritePokemonSelectionForm.name);
  });

  return (
    <div className="favourite-pokemon-selection-form">
      <button onClick={() => updateFavouritePokemon(id.toString())}>
        Make Favourite
      </button>
      <p className="warning">
        This will replace your current favourite Pokemon
      </p>
    </div>
  );
};

export default FavouritePokemonSelectionForm;
