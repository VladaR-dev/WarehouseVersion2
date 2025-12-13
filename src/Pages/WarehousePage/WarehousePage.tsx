import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { AddModalWarehouseProducts, useAddWarehouseProducts } from 'app/Pages';
import { RootState } from 'app/redux/store';

import s from './WarehousePage.module.scss';
import { useEffect } from 'react';
import { setSelectedWarehouseId } from 'app/redux/slices/warehouseSlice';


export const WarehousePage = () => {
  const warehouses = useSelector((state: RootState) => state.warehouse.items);
  const dispatch = useDispatch();

  const params = useParams();
  const current = params.id;

  useEffect(() => {
    if (current) {
      dispatch(setSelectedWarehouseId(current));
    }

    return () => {
      setSelectedWarehouseId(null);
    };
  }, [current, dispatch]);

  const currentWarehouse = warehouses.find((warehouse) => warehouse.id === current);

  console.log('===>current', current);
  console.log('===>currentWarehouse', currentWarehouse);
  console.log('===>warehouses', warehouses);


  const { modalTypeAdd, handleCloseAddModal, openAddModal, handleAdd } = useAddWarehouseProducts();

  if (!currentWarehouse) {
    return <div> Склад не найден</div>;
  }

  return (
    <div className={s.warehouseContainer}>
      <div className={s.headerWarehouse}>
        <div className={s.nameWarehouse}>Склад {currentWarehouse.name}</div>
        <div className={s.buttons}>
          <Button variant="outlined" className={s.btn}>Переместить товары</Button>
          <Button variant="contained" className={s.btn} onClick={() => openAddModal()}>
            Добавить товар
          </Button>
        </div>
      </div>
      <div className={s.mainContent}>{(currentWarehouse.products.length === 0) ? <div>Товаров нет на складе</div> : (
        currentWarehouse.products.map((product) => {
          return <div key={product.id} className={s.itemBlock}>

            <div className={s.itemName}>{product.name}</div>
            <div className={s.QuantityButton}>
              <div className={s.quantity}>{product.quantity} шт</div>
              <Button variant="outlined">Удалить</Button>
            </div>

          </div>;
        })
      )}</div>

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


