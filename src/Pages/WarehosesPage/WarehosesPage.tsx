import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';
import { RootState } from 'app/redux/store';
import s from './WarehousesPage.module.scss';
import {
  EditModal,
  useEditWarehouse,
  DeleteModal,
  useDeleteWarehouse,
  AddModal,
  useAddWarehouse,
} from './Modals';
import { filteredWarehouses } from 'app/redux/slices/warehouseSlice';

export const WarehousesPage = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse);

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

  const [search, setSearch] = useState<string>('');

  const visibleItems = !search ? warehouses.items : warehouses.filteredItems;

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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
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
              {item.name}
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
        <EditModal
          warehouseName={warehouseNameEdit}
          onSubmit={handleEdit}
          handleClose={handleCloseEditModal}
          isOpen={modalTypeEdit === 'edit'}
        />
      )}
      {modalTypeAdd === 'add' && (
        <AddModal
          onSubmit={handleAdd}
          handleClose={handleCloseAddModal}
          isOpen={modalTypeAdd === 'add'}
        />
      )}
      {modalTypeDelete === 'delete' && (
        <DeleteModal
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
