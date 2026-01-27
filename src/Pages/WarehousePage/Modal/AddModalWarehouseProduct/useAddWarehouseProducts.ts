import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { updateWarehouseProducts } from 'app/redux/slices/warehouseSlice';
import { deleteProductsBatch, Product } from 'app/redux/slices/productsSlices';


export const useAddWarehouseProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
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
    const filteredProducts = selectedProducts.filter((product) => product.quantity > 0);

    if (selectedProducts.length === 0) {
      handleCloseAddModal();
      return;
    }

    if (!selectedWarehouseId) {
      handleCloseAddModal();
      return;
    }
//map может давать undefind, undefind у нас быть не может
    const fullProductsInfo: Product[] = [];

    filteredProducts.forEach(({ productId, quantity }) => {
      const product = products.find((product) => product.id === productId);

      if (product) {
        fullProductsInfo.push({ ...product, quantity });
      }
    });

    dispatch(updateWarehouseProducts({
      warehouseId: selectedWarehouseId,
      products: fullProductsInfo,
    }));

    dispatch(deleteProductsBatch(filteredProducts));

    handleCloseAddModal();
  };
  return {
    modalTypeAdd,
    handleCloseAddModal,
    openAddModal,
    handleAdd,
  };
};
