import { Modal } from 'app/components';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import s from './AddModal.module.scss';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (name: string) => void;
}

export const AddModalWarehouse = ({ isOpen, handleClose, onSubmit }: Props) => {
  const [newWarehouse, setNewWarehouse] = useState('');

  const handleSubmit = () => {
    onSubmit(newWarehouse);
  };

  return (
    <Modal
      submitButtonText="Добавить"
      onSubmit={handleSubmit}
      title="Добавить склад"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={s.contentAddModal}>
        <TextField className={s.inp}
          id="outlined-basic"
          label="Название склада"
          variant="outlined"
          sx={{ width: '400px', borderRadius: '12px' }}
          value={newWarehouse}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWarehouse(e.target.value)}
        />
      </div>
    </Modal>
  );
};
