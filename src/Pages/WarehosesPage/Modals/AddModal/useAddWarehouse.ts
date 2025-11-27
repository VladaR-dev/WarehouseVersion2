import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { searchDuplicate } from 'app/utils';
import { RootState } from 'app/redux/store';
import { addWarehouse } from 'app/redux/slices/warehouseSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const useAddWarehouse = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse.items);

  const [modalTypeAdd, setModalTypeAdd] = useState('');

  const handleCloseAddModal = () => {
    setModalTypeAdd('');
  };

  const openModalAdd = () => {
    setModalTypeAdd('add');
  };

  const handleAdd = (name: string) => {
    const hasDuplicate = searchDuplicate(name, warehouses);

    if (name.trim() && !hasDuplicate) {
      dispatch(
        addWarehouse({
          name: name.trim(),
          id: uuidv4(),
          products: [],
        }),
      );
      handleCloseAddModal();
    }
    if (hasDuplicate) {
      toast.error('Склад с таким названием уже существует');
    }
  };
  return {
    handleAdd,
    openModalAdd,
    handleCloseAddModal,
    modalTypeAdd,
  };
};
