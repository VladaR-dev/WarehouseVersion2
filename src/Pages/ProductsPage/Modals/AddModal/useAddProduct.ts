import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { searchDuplicate } from 'app/utils';
import { addProduct } from 'app/redux/slices/productsSlices';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const useAddProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [modalTypeAdd, setModalTypeAdd] = useState('');

  const handleCloseAddModal = () => {
    setModalTypeAdd('');
  };

  const openAddModal = () => {
    setModalTypeAdd('add');
  };

  const handleAdd = (name: string, quantity: number) => {
    const hasDuplicate = searchDuplicate(name, products);

    if (name.trim() && !hasDuplicate) {
      if (quantity <= 0) {
        toast.error('Количество товвара должно быть больше 0');
        return;
      }
      dispatch(
        addProduct({
          name: name.trim(),
          id: uuidv4(),
          quantity,
        }),
      );
      handleCloseAddModal();
    }
    if (hasDuplicate) {
      toast.error('Товар с таким названием уже существует');
    }
  };
  return {
    modalTypeAdd,
    handleCloseAddModal,
    openAddModal,
    handleAdd,
  };
};
