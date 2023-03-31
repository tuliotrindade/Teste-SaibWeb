import React, { useState } from "react";
import axios from "axios";
import { BASE_ENDPOINT } from "../Constants/endpoints";

const ApiContext = React.createContext();

const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const getAllRegisters = async () => {
    const result = await axios.get(BASE_ENDPOINT + "s");
    setData(result.data.data);
  };

  const getOneRegister = async (id) => {
    const result = await axios.get(BASE_ENDPOINT + `/${id}`);
    return result.data.data;
  };

  const createRegister = async (form) => {
    const payload = {
      TECL_NOME: form.nome,
      TECL_ENDERECO: form.endereco,
      TECL_CIDADE: form.cidade,
      TECL_UF: form.uf,
      TECL_TELEFONE: form.telefone,
    };
    const response = await axios.post(BASE_ENDPOINT, payload);
    return response;
  };

  const deleteRegister = async (id) => {
    const response = await axios.delete(BASE_ENDPOINT + `/${id}`);
    return response;
  };

  const editRegister = async (form, id) => {
    const payload = {
      TECL_NOME: form.nome,
      TECL_ENDERECO: form.endereco,
      TECL_CIDADE: form.cidade,
      TECL_UF: form.uf,
      TECL_TELEFONE: parseInt(form.telefone),
      TECL_ID: id,
    };
    const response = await axios.put(BASE_ENDPOINT, payload);

    return response;
  };

  return (
    <ApiContext.Provider
      value={{
        data,
        setData,
        getAllRegisters,
        createRegister,
        deleteRegister,
        editRegister,
        getOneRegister,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider, ApiContext };
