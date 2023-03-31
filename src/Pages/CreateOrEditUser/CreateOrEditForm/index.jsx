import React, { useContext, useEffect, useState } from "react";
import "./CreateOrUpdateForm.css";
import { ApiContext } from "../../../Providers/ApiProviders";
import { useNavigate } from "react-router-dom";

export default function CreateOrEditForm({ id }) {
  const { createRegister, getOneRegister, editRegister } =
    useContext(ApiContext);
  const navigate = useNavigate();
  const [validatePhone, setValidatePhone] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.telefone.length < 10) {
      return setValidatePhone(true)
    }
    
    if (id) {
      return editRegister(formData, id)
        .then(() => navigate(-1))
        .then(() => alert("Registro editado com sucesso!"));
    }
    createRegister(formData)
      .then(() => navigate(-1))
      .then(() => alert("Registro criado com sucesso!"));
  };

  const handleClose = () => navigate(-1)

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
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-update-form-style">
        <div className="input-container">
          <label for="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label for="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
        </div>
        <div className="input-container" id="cidade-container">
          <label for="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </div>
        <div className="input-container" id="uf-container">
          <label for="uf">UF</label>
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
          <label for="telefone">Telefone</label>
          <input
            maxLength={11}
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>
        {validatePhone && (
          <span style={{ color: "red" }}>
            O número de telefone deve ter 10 dígitos
          </span>
        )}
      </div>
      <div className="buttons-group-style">
        <button type="submit">Salvar</button>
        <button onClick={handleClose}>Cancelar</button>
      </div>
    </form>
  );
}
