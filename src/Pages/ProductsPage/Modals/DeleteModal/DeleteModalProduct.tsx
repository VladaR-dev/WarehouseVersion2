import React, { useState } from 'react';
import { Modal } from 'app/components';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import s from './DeleteModalProduct.module.scss';
import { Product } from 'app/redux/slices/productsSlices';

interface Props {
  products: Product[];
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (quantity: number) => void;
  productId: string;
}

export const DeleteModalProduct = ({
  isOpen,
  handleClose,
  onSubmit,
  productId,
  products,
}: Props) => {
  const [quantityType, setQuantityType] = useState('all');
  const [quantity, setQuantity] = useState(0);

  const selectProduct = products.find((product) => product.id === productId);

  console.log('quantityType', quantityType);

  const handleSubmit = () => {
    if (quantityType === 'all') {
      onSubmit(selectProduct!.quantity); //Должно быть item.quantity
      return;
    }
    onSubmit(quantity);
  };

  return (
    <Modal
      submitButtonText="Удалить"
      onSubmit={handleSubmit}
      title="Удалить товар"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={s.contentDeleteModal}>
        <FormControl className={s.formControl}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={quantityType}
            onChange={(e) => setQuantityType(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="Удалить весь товар" />
            <FormControlLabel
              value="some"
              control={<Radio />}
              label="Удалить конкретное количество"
            />
          </RadioGroup>
          {quantityType === 'some' && (
            <div className={s.someQuantityProducts}>
              <div className={s.questionQuantity}>Какое количество вы хотите удалить?</div>
              <div className={s.numberQuantity}>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.valueAsNumber)}
                />
                {`/ ${selectProduct?.quantity}`}
              </div>
            </div>
          )}
        </FormControl>
      </div>
    </Modal>
  );
};
