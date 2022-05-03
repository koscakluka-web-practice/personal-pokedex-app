import * as React from "react";

import "./BasicModal.css";

interface PokemonProfilePageProps {
  closeModal: () => void;
  className: string;
}

const PokemonProfilePage: React.FunctionComponent<PokemonProfilePageProps> = ({
  closeModal,
  children,
  className,
}) => {
  return (
    <div className={"modalSpace " + className}>
      <div className="modalBackground" onClick={closeModal} />
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default PokemonProfilePage;
