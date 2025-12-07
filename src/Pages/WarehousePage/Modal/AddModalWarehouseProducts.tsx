import React, { useState } from 'react';
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



  const handleSubmit = () => {
    // onSubmit();
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
        {products.map((product) => (
          <div key={product.id}>
            <div className={s.item}>
              <div className={s.nameItem}>{product.name}</div>
              <div className={s.counter}>
                <div className={s.minus} onClick={() => {}}>
                  -
                </div>
                <div className={s.quantity}>{`q / ${product.quantity}`} </div>
                <div className={s.plus} onClick={() => {}}>
                  +
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
