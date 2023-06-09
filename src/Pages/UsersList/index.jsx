import React, { useContext, useEffect } from "react";
import Header from "../../Components/Header";
import { ApiContext } from "../../Providers/ApiProviders";
import Table from "./Components/Table";
import "./UsersList.css";

export default function UsersList() {
  const { getAllRegisters } = useContext(ApiContext);

  useEffect(() => {
    getAllRegisters();
  }, [getAllRegisters]);

  return (
    <div className="users-list-style">
      <Header title="Teste ReactJS - SaibWeb" />
      <Table />
    </div>
  );
}
