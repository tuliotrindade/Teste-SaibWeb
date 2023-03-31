import React, { useContext, useState } from "react";
import "./Table.css";
import PlusIcon from "../../../../assets/plusPng.png";
import EditIcon from "../../../../assets/editPNG.png";
import RemoveIcon from "../../../../assets/minusPNG.png";
import { Link } from "react-router-dom";
import DeleteModal from "../../../../Components/DeleteModal";
import SearchBar from "../SearchBar";
import { ApiContext } from "../../../../Providers/ApiProviders";

const Table = () => {
  const { data, filteredData } = useContext(ApiContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const openCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      if (match[2].length === 4) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
      }
      return (
        "(" +
        match[1] +
        ") " +
        match[2].substr(0, 5) +
        "-" +
        match[2].substr(5) +
        match[3]
      );
    }
    return phoneNumber;
  };

  return (
    <div className="table-style">
      <SearchBar data={data} />
      <table>
        <thead>
          <tr>
            <th>
              <div className="plus-icon">
                <Link to={"/create-or-edit"} state={{ title: "Novo Registro" }}>
                  <img
                    src={PlusIcon}
                    alt="botão para adicionar novo registro"
                  />
                </Link>
              </div>
            </th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Telefone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        {filteredData && filteredData.length > 0 ? (
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.TECL_ID}>
                <td>
                  <div className="actions-table">
                    <img
                      src={RemoveIcon}
                      onClick={() => {
                        setSelectedId(item.TECL_ID);
                        setIsModalOpen(item);
                      }}
                      alt="Botão para remover registro"
                    />
                    <Link
                      to={"/create-or-edit"}
                      state={{ title: "Editar Registro", id: item.TECL_ID }}
                    >
                      <img src={EditIcon} alt="Botão para editar registro" />
                    </Link>
                  </div>
                </td>
                <td>{item.TECL_NOME}</td>
                <td>{item.TECL_ENDERECO}</td>
                <td>{item.TECL_CIDADE}</td>
                <td>{item.TECL_UF}</td>
                <td>{formatPhoneNumber(item.TECL_TELEFONE)}</td>
                <td>--</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                {filteredData ? "Sem registros com esse nome" : "Carregando..."}
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {isModalOpen && (
        <DeleteModal onClose={openCloseModal} id={selectedId}>
          <p className="modal-text">
            Por favor, confirme ou cancele a exclusão do registro.
          </p>
        </DeleteModal>
      )}
    </div>
  );
};

export default Table;
