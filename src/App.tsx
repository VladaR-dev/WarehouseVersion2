import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ProductsPage, WarehousePage, WarehousesPage } from 'app/Pages';
import { Dashboard, Header } from 'app/components';

import './App.scss';

export const App = () => {
  return (
    <div className="appContainer">
      <Header />
      <div className="mainContainer">
        <Dashboard />
        <div className="pagesContainer">
          <Routes>
            <Route path="/" element={<WarehousesPage />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path=":id" element={<WarehousePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
