import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';


export const useAddWarehouseProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const warehouses = useSelector((state: RootState) => state.warehouse.items);
  const selectedWarehouseId = useSelector(
    (state: RootState) => state.warehouse.selectedWarehouseId,
  );

  const [modalTypeAdd, setModalTypeAdd] = useState('');

  const handleCloseAddModal = () => {
    setModalTypeAdd('');
  };

  const openAddModal = () => {
    setModalTypeAdd('add');
  };

  const handleAdd = (selectedProducts: { productId: string; quantity: number }[]) => {


    handleCloseAddModal();
  };
  return {
    modalTypeAdd,
    handleCloseAddModal,
    openAddModal,
    handleAdd,
  };
};
