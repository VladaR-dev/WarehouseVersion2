import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editWarehouse } from 'app/redux/slices/warehouseSlice';
import { toast } from 'react-toastify';
import { RootState } from 'app/redux/store';
import { searchDuplicate } from 'app/utils';

export const useEditWarehouse = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse.items);

  const [modalTypeEdit, setModalTypeEdit] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [warehouseNameEdit, setWarehouseName] = useState('');

  const handleCloseEditModal = () => {
    setModalTypeEdit('');
  };

  const openModalEdit = (id: string, name: string) => {
    setWarehouseId(id);
    setWarehouseName(name);
    setModalTypeEdit('edit');
  };
  const handleEdit = (newName: string) => {
    const hasDuplicate = searchDuplicate(warehouseNameEdit, warehouses);
    const currentWarehouse = warehouses.find((item) => item.id === warehouseId);

    if (warehouseId && warehouseNameEdit.trim()) {
      if (!hasDuplicate || newName.trim() !== currentWarehouse?.name) {
        dispatch(
          editWarehouse({
            id: warehouseId,
            name: newName.trim(),
          }),
        );
        handleCloseEditModal();
        return;
      }
      toast.error('Склад с таким названием уже существует');
      return;
    }
  };

  return {
    modalTypeEdit,
    handleEdit,
    openModalEdit,
    handleCloseEditModal,
    warehouseNameEdit,
  };
};
