import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'app/components';
import s from './AddModalWarehouseProducts.module.scss';
import { RootState } from 'app/redux/store';

interface SelectedProduct {
  productId: string;
  quantity: number;
}

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (selectedProducts: SelectedProduct[]) => void;
}

export const AddModalWarehouseProducts = ({ isOpen, handleClose, onSubmit }: Props) => {
  const products = useSelector((state: RootState) => state.products.items);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const handleDecrementQuantity = (productId: string) => {
    setSelectedProducts((prev) => {
      const existingProduct = prev.find((item) => item.productId === productId);

//если продукта нет или кол-во 0, ничего не делаем
      if (!existingProduct) {
        return prev;
      }

//если 1 то удаляем
      if (existingProduct.quantity === 1) {
        return prev.filter((item) => item.productId !== productId);
      }

//в остальных случаях уменьшаем кол-во на 1
      return prev.map((item) => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const handleIncrementQuantity = (productId: string) => {
    setSelectedProducts((prev) => {
      const existingProduct = prev.find(item => item.productId === productId);
      const product = products.find((item) => item.id === productId);
      const maxQuantity = product?.quantity || 0;

      //продукта нет в выбранных
      if (!existingProduct) return [...prev, { productId, quantity: 1 }];

      //достигнут лимит
      if (existingProduct.quantity >= maxQuantity) {
        return prev;
      }

      //можно добавить еще
      return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
    });


  };

  const handleInputChange = (productId: string, value: number) => {
    setSelectedProducts((prev) => {
      const existingProduct = prev.find((item) => item.productId === productId);

      if (existingProduct) {
        return prev.map((item) => {
          return item.productId === productId
            ? { ...item, quantity: value }
            : item;
        });
      }
      return [...prev, { productId, quantity: value }];
    });
  };

  const getSelectedQuantity = (productId: string) => {
    const selected = selectedProducts.find((item) => item.productId === productId);
    return selected ? selected.quantity : 0;
  };

  const handleSubmit = () => {
    onSubmit(selectedProducts);
  };

  return (
    <Modal
      submitButtonText="Добавить"
      onSubmit={handleSubmit}
      title="Нераспределенные продукты"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={s.contentAddModal}>
        {products.map((product) => {
          const selectedQty = getSelectedQuantity(product.id);

          return (
            <div key={product.id}>
              <div className={s.item}>
                <div className={s.nameItem}>{product.name}</div>
                <div className={s.counter}>
                  <div
                    className={s.minus}
                    onClick={() => handleDecrementQuantity(product.id)}
                  >
                    -
                  </div>
                  <div className={s.quantity}>
                    <input
                      type="number"
                      value={selectedQty}
                      onChange={(e) => handleInputChange(product.id, Number(e.target.value))}
                      className={s.quantityInput}
                    /> / {product.quantity}
                  </div>
                  <div
                    className={s.plus}
                    onClick={() => handleIncrementQuantity(product.id)}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
