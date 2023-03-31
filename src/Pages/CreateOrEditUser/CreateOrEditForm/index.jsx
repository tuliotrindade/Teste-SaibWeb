import React, { useContext, useEffect, useState } from "react";
import "./CreateOrUpdateForm.css";
import { ApiContext } from "../../../Providers/ApiProviders";
import { useNavigate } from "react-router-dom";

export default function CreateOrEditForm({ id }) {
  const { createRegister, getOneRegister, editRegister, getAllRegisters } =
    useContext(ApiContext);
  const navigate = useNavigate();
  const [validateFormMessage, setValidateFormMessage] = useState("");
  const [renderValidateMessage, setRenderValidateMessage] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    uf: "",
    telefone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      const newPhone = e.target.value.replace(/[^\d]/g, "");
      return setFormData((prevState) => ({ ...prevState, [name]: newPhone }));
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    if (formData.nome?.length < 4) {
      console.log("testeFormdata", formData);
      setRenderValidateMessage(true);
      setValidateFormMessage("O nome deve ter ao menos 4 caracteres.");
      return true;
    }
    if (formData.endereco?.length < 5) {
      setRenderValidateMessage(true);
      setValidateFormMessage("O endereço deve ter ao menos 5 caracteres.");
      return true;
    }
    if (formData.cidade?.length < 4) {
      setRenderValidateMessage(true);
      setValidateFormMessage("A cidade deve ter ao menos 4 caracteres.");
      return true;
    }
    if (formData.uf?.length !== 2) {
      setRenderValidateMessage(true);
      setValidateFormMessage("A UF deve ter 2 caracteres.");
      return true;
    }
    if (formData.telefone?.length < 10) {
      setRenderValidateMessage(true);
      setValidateFormMessage("O telefone deve ter ao menos 10 numeros.");
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRenderValidateMessage(false);
    setValidateFormMessage("");
    if (!validateForm()) {
      if (id) {
        return editRegister(formData, id)
          .then(() => navigate(-1))
          .then(() => getAllRegisters())
          .then(() => alert("Registro editado com sucesso!"));
      }
      createRegister(formData)
        .then(() => navigate(-1))
        .then(() => getAllRegisters())
        .then(() => alert("Registro criado com sucesso!"));
    }
  };

  const handleClose = () => navigate(-1);

  useEffect(() => {
    if (id) {
      getOneRegister(id).then((res) =>
        setFormData({
          nome: res[0].TECL_NOME,
          endereco: res[0].TECL_ENDERECO,
          cidade: res[0].TECL_CIDADE,
          uf: res[0].TECL_UF,
          telefone: res[0].TECL_TELEFONE,
        })
      );
    }
  }, [getOneRegister, id]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-update-form-style">
        <div className="input-container">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
        </div>
        <div className="input-container" id="cidade-container">
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </div>
        <div className="input-container" id="uf-container">
          <label htmlFor="uf">UF</label>
          <input
            maxLength={2}
            type="text"
            id="uf"
            name="uf"
            value={formData.uf}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="telefone">Telefone</label>
          <input
            maxLength={11}
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>
        {renderValidateMessage && (
          <span style={{ color: "red" }}>{validateFormMessage}</span>
        )}
      </div>
      <div className="buttons-group-style">
        <button type="submit">Salvar</button>
        <button onClick={handleClose}>Cancelar</button>
      </div>
    </form>
  );
}
