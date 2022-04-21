import * as React from "react";

interface PokemonProfilePageProps {
  closeModal: () => void;
}

const PokemonProfilePage: React.FunctionComponent<PokemonProfilePageProps> = ({
  closeModal,
  children,
}) => {
  return (
    <div className="modalSpace">
      <div className="modalBackground" onClick={closeModal} />
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PokemonProfilePage;
