import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { toast } from 'react-toastify';
import { removeProductsFromWarehouse } from 'app/redux/slices/warehouseSlice';
import { increaseProductQuantity } from 'app/redux/slices/productsSlices';

export const useDeleteWarehouseProduct = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse.items);

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');

  const [modalTypeDelete, setModalTypeDelete] = useState('');

  const handleCloseDeleteModal = () => {
    setModalTypeDelete('');
    setSelectedProductId('');
    setSelectedWarehouseId('');
  };

  const openDeleteModal = (idProduct: string, idWarehouse: string) => {
    setModalTypeDelete('delete');
    setSelectedProductId(idProduct);
    setSelectedWarehouseId(idWarehouse);
  };

  const processProductDelete = (
    product: { name: string; id: string; quantity: number },
    quantity: number,
  ) => {
    dispatch(removeProductsFromWarehouse({
      warehouseId: selectedWarehouseId,
      products: [{ name: product.name, id: selectedProductId, quantity }],
    }));

    dispatch(increaseProductQuantity({
      name: product.name, id:
      selectedProductId, quantity,
    }));
  };

  const handleDelete = (quantity: number) => {
    console.log('handleDelete начал работу');
    console.log('quantity:', quantity);

    if (!selectedProductId) {
      console.log('Нет selectedProductId');
      return;
    }

    const warehouse = warehouses.find(warehouse => warehouse.id === selectedWarehouseId);
    const product = warehouse?.products.find(product => product.id === selectedProductId);


    console.log(' warehouse найден?:', !!warehouse);
    console.log(' product найден?:', !!product);
    console.log(' product.quantity:', product?.quantity);

    if (!warehouse) {
      toast.error('Склад не найден');
      return;
    }

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
    console.log('️ Проверка условия:');
    console.log('  quantity === 0:', quantity === 0);
    console.log('  quantity === product?.quantity:', quantity === product?.quantity);
    console.log('  Условие выполнено?:', quantity === 0 || quantity === product?.quantity);

    if (quantity === 0 || quantity === product.quantity) {
      console.log(' Условие выполнено, удаляем...');

      processProductDelete(product, quantity);
      handleCloseDeleteModal();

      console.log(' Модалка закрыта');

      return;
    }
    processProductDelete(product, quantity);
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
