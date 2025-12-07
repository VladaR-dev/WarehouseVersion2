import * as React from 'react';
import { Button } from '@mui/material';
import s from './WarehousePage.module.scss';
import { AddModalWarehouseProducts, useAddWarehouseProducts } from 'app/Pages';

export const WarehousePage = () => {
  const { modalTypeAdd, handleCloseAddModal, openAddModal, handleAdd } = useAddWarehouseProducts();
  return (
    <div className={s.warehouseContainer}>
      <div className={s.headerWarehouse}>
        <div className={s.nameWarehouse}>N склад</div>
        <div className={s.buttons}>
          <Button variant="outlined">Переместить товары</Button>
          <Button variant="contained" onClick={() => openAddModal()}>
            Добавить товар
          </Button>
        </div>
      </div>
      <div className={s.mainContent}>Items</div>
      {modalTypeAdd === 'add' && (
        <AddModalWarehouseProducts
          onSubmit={handleAdd}
          handleClose={handleCloseAddModal}
          isOpen={modalTypeAdd === 'add'}
        />
      )}
    </div>
  );
};
