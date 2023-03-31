import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersList from './Pages/UsersList';
import CreateOrEdit from './Pages/CreateOrEditUser';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/create-or-edit" element={<CreateOrEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;