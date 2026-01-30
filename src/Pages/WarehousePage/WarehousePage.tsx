import  React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from '@mui/material';

import {
  AddModalWarehouseProducts,
  DeleteModalWarehouseProduct,
  useAddWarehouseProducts,
  useDeleteWarehouseProduct,
} from 'app/Pages';
import { RootState } from 'app/redux/store';

import s from './WarehousePage.module.scss';
import { setSelectedWarehouseId } from 'app/redux/slices/warehouseSlice';

export const WarehousePage = () => {
  const warehouses = useSelector((state: RootState) => state.warehouse.items);
  const dispatch = useDispatch();

  const params = useParams();
  const current = params.id;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (current) {
      dispatch(setSelectedWarehouseId(current));
    }

    return () => {
      setSelectedWarehouseId(null);
      setSearchTerm('');
    };
  }, [current, dispatch]);

  const currentWarehouse = warehouses.find((warehouse) => warehouse.id === current);
  const products = currentWarehouse?.products;

  const filteredProducts = useMemo(() => {
    if (!currentWarehouse?.products) return [];

    if (!searchTerm.trim()) return currentWarehouse.products;

    return currentWarehouse.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  }, [currentWarehouse, searchTerm]);

  const { modalTypeAdd, handleCloseAddModal, openAddModal, handleAdd } = useAddWarehouseProducts();
  const {
    selectedProductId,
    modalTypeDelete,
    handleCloseDeleteModal,
    openDeleteModal,
    handleDelete,
  } = useDeleteWarehouseProduct();


  if (!currentWarehouse) {
    return <div> Склад не найден</div>;
  }

  if (!products) return null;

  // console.log('===>currentWarehouse', currentWarehouse);
  return (
    <div className={s.warehouseContainer}>
      <div className={s.headerWarehouse}>
        <div className={s.nameWarehouse}>Склад {currentWarehouse.name}</div>
        <div className={s.buttons}>
          <TextField
            id="outlined-search"
            variant="outlined"
            type="search"
            label="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outlined" className={s.btn}>Переместить товары</Button>
          <Button variant="contained" className={s.btn} onClick={() => openAddModal()}>
            Добавить товар
          </Button>
        </div>
      </div>
      <div className={s.mainContent}>{(filteredProducts.length === 0) ? <div>Товаров нет на складе</div> : (
        filteredProducts.map((product) => {
          return <div key={product.id} className={s.itemBlock}>

            <div className={s.itemName}>{product.name}</div>
            <div className={s.QuantityButton}>
              <div className={s.quantity}>{product.quantity} шт</div>
              <Button variant="outlined"
                      onClick={() => {
                        console.log('===>searchTerm', searchTerm);
                        openDeleteModal(product.id, currentWarehouse.id);
                      }}>Удалить</Button>
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
      {modalTypeDelete === 'delete' && selectedProductId && (
        <DeleteModalWarehouseProduct
          products={products}
          onSubmit={handleDelete}
          handleClose={handleCloseDeleteModal}
          isOpen={modalTypeDelete === 'delete'}
          productId={selectedProductId}
        />)}
    </div>
  );
};


