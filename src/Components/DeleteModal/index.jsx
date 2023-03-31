import React, { useContext } from "react";
import "./DeleteModal.css";
import { ApiContext } from "../../Providers/ApiProviders";

export default function DeleteModal({ onClose, children, id }) {
  const { deleteRegister, getAllRegisters } = useContext(ApiContext);
  const deleteAndCloseModal = (id) => {
    deleteRegister(id)
      .then(() => getAllRegisters())
      .then(() => onClose())
      .then(() => alert("Registro Excluido com sucesso"));
  };
  return (
    <div className="overlay">
      <div className="modal-content">
        <p>{children}</p>
        <div className="modal-actions">
          <button
            className="modal-button"
            onClick={() => deleteAndCloseModal(id)}
          >
            Confirmar
          </button>
          <button className="modal-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
