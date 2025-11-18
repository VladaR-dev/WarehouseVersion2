import { Modal } from 'app/components';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import s from './EditModal.module.scss';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (name: string) => void;
  warehouseName: string;
}

export const EditModal = ({ isOpen, handleClose, onSubmit, warehouseName }: Props) => {
  const [newWarehouseName, setWarehouseName] = useState(warehouseName);

  const handleSubmit = () => {
    onSubmit(newWarehouseName);
  };

  return (
    <Modal
      onSubmit={handleSubmit}
      title="Редактирование склада"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={s.input}>
        <TextField
          className={s.nameWarehouseInp}
          id="outlined-basic"
          label="Название склада"
          variant="outlined"
          sx={{ width: '400px', borderRadius: '12px' }}
          value={newWarehouseName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWarehouseName(e.target.value)}
        />
      </div>
    </Modal>
  );
};
