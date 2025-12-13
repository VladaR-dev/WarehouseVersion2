import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';
import { RootState } from 'app/redux/store';
import s from './WarehousesPage.module.scss';
import {
  EditModalWarehouse,
  useEditWarehouse,
  DeleteModalWarehouse,
  useDeleteWarehouse,
  AddModalWarehouse,
  useAddWarehouse,
} from './Modals';
import { filteredWarehouses } from 'app/redux/slices/warehouseSlice';
import { Link } from 'react-router-dom';

export const WarehousesPage = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse.items);
  const searchTerm = useSelector((state: RootState) => state.warehouse.searchTerm);

  console.log('searchTerm', searchTerm);
  console.log('warehouses', warehouses);

  const { modalTypeEdit, openModalEdit, handleCloseEditModal, handleEdit, warehouseNameEdit } =
    useEditWarehouse();
  const {
    modalTypeDelete,
    handleCloseDeleteModal,
    openModalDelete,
    handleDelete,
    warehouseNameDelete,
    warehouseId,
  } = useDeleteWarehouse();
  const { openModalAdd, handleAdd, handleCloseAddModal, modalTypeAdd } = useAddWarehouse();

  const visibleItems = useMemo(() => {
    if (!searchTerm) return warehouses;
    return warehouses.filter((warehouse) =>
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [warehouses, searchTerm]);

  return (
    <>
      <div className={s.containerWarehousesPage}>
        <div className={s.headerWarehouses}>
          <Typography variant="h1" gutterBottom>
            Мои склады
          </Typography>

          <div className={s.rightSide}>
            <TextField
              id="outlined-search"
              variant="outlined"
              type="search"
              label="Поиск"
              value={searchTerm}
              onChange={(e) => {
                dispatch(filteredWarehouses(e.target.value));
              }}
            />
            <Button variant="contained" onClick={() => openModalAdd()} className={s.btn}>
              Добавить склад
            </Button>
          </div>
        </div>

        <div className={s.itemsList}>
          {visibleItems.map((item) => (
            <div key={item.id} className={s.item}>
              <Link to={`/warehouses/${item.id}`}>{item.name}</Link>

              <div className={s.itemButton}>
                <Button
                  className={s.btn}
                  variant="outlined"
                  onClick={() => {
                    openModalEdit(item.id, item.name);
                  }}
                >
                  Редактировать
                </Button>
                <Button
                  className={s.btn}
                  variant="outlined"
                  onClick={() => {
                    openModalDelete(item.id, item.name);
                  }}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalTypeEdit === 'edit' && (
        <EditModalWarehouse
          warehouseName={warehouseNameEdit}
          onSubmit={handleEdit}
          handleClose={handleCloseEditModal}
          isOpen={modalTypeEdit === 'edit'}
        />
      )}
      {modalTypeAdd === 'add' && (
        <AddModalWarehouse
          onSubmit={handleAdd}
          handleClose={handleCloseAddModal}
          isOpen={modalTypeAdd === 'add'}
        />
      )}
      {modalTypeDelete === 'delete' && (
        <DeleteModalWarehouse
          warehouseId={warehouseId}
          warehouseName={warehouseNameDelete}
          onSubmit={handleDelete}
          handleClose={handleCloseDeleteModal}
          isOpen={modalTypeDelete === 'delete'}
        />
      )}
    </>
  );
};
