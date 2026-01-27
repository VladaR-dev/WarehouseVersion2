import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Product } from 'app/redux/slices/productsSlices';
import { Modal } from 'app/components';
import s from './DeleteModalWarehouseProduct.module.scss';

interface Props {
  products: Product[];
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (quantity: number) => void;
  productId: string;
}

export const DeleteModalWarehouseProduct = ({ isOpen, handleClose, onSubmit, products, productId }: Props) => {
  const [quantityType, setQuantityType] = useState<'all' | 'some'>('all');
  const [quantity, setQuantity] = useState(0);

  const selectProduct = products.find((product) => product.id === productId);

  if(!selectProduct) return;

const handleSubmit = () => {
  if(quantityType === 'all') {
    onSubmit(selectProduct!.quantity);
    return;
  }
  onSubmit(quantity);
}

  return (
    <Modal
      submitButtonText="Удалить"
      onSubmit={handleSubmit}
      title={`Удалить ${selectProduct.name}`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={s.contentDeleteModal}>

        <FormControl className={s.formControl}>
          <RadioGroup
            aria-labelledby="delete-type-radio-group"
            name="delete-type-radio-group"
            value={quantityType}
            onChange={(e) => setQuantityType(e.target.value as 'all' | 'some')}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Удалить весь товар"
            />
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
                  onChange={(e)=>setQuantity(e.target.valueAsNumber)}
                  placeholder="Введите количество"
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
