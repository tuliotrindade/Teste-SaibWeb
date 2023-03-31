import React from "react";
import "./Header.css";
import back from "../../assets/backPng.png";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <header className="header-style">
      <button className="header-button" onClick={() => navigate(-1)}>
        <img src={back} alt="icone para voltar de pagina" />
      </button>
      <h3>{title}</h3>
    </header>
  );
}
