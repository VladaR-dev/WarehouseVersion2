import { useDispatch} from 'react-redux';
import { useState } from 'react';
import { removeWarehouse } from 'app/redux/slices/warehouseSlice';

export const useDeleteWarehouse = () => {
  const dispatch = useDispatch();

  const [modalTypeDelete, setModalTypeDelete] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [warehouseNameDelete, setWarehouseName] = useState('');

  const handleCloseDeleteModal = () => {
    setModalTypeDelete('');
    setWarehouseId('');
  };

  const openModalDelete = (id: string, name: string) => {
    setWarehouseId(id);
    setWarehouseName(name);
    setModalTypeDelete('delete');
  };

  const handleDelete = (id: string) => {
    if (warehouseId) {
      dispatch(removeWarehouse(id));
      handleCloseDeleteModal();
    }
  };

  return {
    warehouseId,
    warehouseNameDelete,
    modalTypeDelete,
    handleCloseDeleteModal,
    openModalDelete,
    handleDelete,
  };
};
