import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { deleteProduct, removeProductCompletely } from 'app/redux/slices/productsSlices';
import { toast } from 'react-toastify';

export const useDeleteProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const [modalTypeDelete, setModalTypeDelete] = useState('');

  const handleCloseDeleteModal = () => {
    setModalTypeDelete('');
    setSelectedProductId('');
  };

  const openDeleteModal = (id: string) => {
    setModalTypeDelete('delete');
    setSelectedProductId(id);
  };

  const handleDelete = (quantity: number) => {
    if (!selectedProductId) return;

    const product = products.find((product) => product.id === selectedProductId);

    if (!product) {
      toast.error('Товар не найден');
      return;
    }

    if (quantity < 0) {
      toast.error('Количество должно быть больше 0');
      return;
    }

    if (quantity > product.quantity) {
      toast.error('Нельзя удалить больше товара, чем есть в наличии');
      return;
    }

    if (quantity === 0 || quantity === product.quantity) {
      dispatch(removeProductCompletely(selectedProductId));
      handleCloseDeleteModal();
      return;
    }

    dispatch(
      deleteProduct({
        id: selectedProductId,
        quantity: quantity,
      }),
    );
    handleCloseDeleteModal();
  };
  return {
    selectedProductId,
    modalTypeDelete,
    handleCloseDeleteModal,
    openDeleteModal,
    handleDelete,
  };
};
