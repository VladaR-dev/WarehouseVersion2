import React, { useState } from 'react';
import { Modal } from 'app/components';
import { TextField } from '@mui/material';
import s from './AddModalProduct.module.scss';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (name: string, quantity: number) => void;
}

export const AddModalProduct = ({ isOpen, handleClose, onSubmit }: Props) => {
  const [newProduct, setNewProduct] = useState('');
  const [guantityProduct, setQuantityProduct] = useState(0);

  const handleSubmit = () => {
    onSubmit(newProduct, guantityProduct);
  };
  return (
    <Modal
      submitButtonText="Добавить"
      onSubmit={handleSubmit}
      title="Добавить товар"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={s.contentAddModal}>
        <TextField
          className={s.inp}
          id="outlined-basic"
          label="Название продукта"
          variant="outlined"
          sx={{ width: '400px', borderRadius: '12px' }}
          value={newProduct}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct(e.target.value)}
        />
        <TextField
          className={s.inp}
          type="number"
          id="outlined-basic"
          label="Количество"
          variant="outlined"
          sx={{ width: '400px', borderRadius: '12px' }}
          value={guantityProduct}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantityProduct(+e.target.value)}
        />
      </div>
    </Modal>
  );
};
