import React from 'react';
import { Modal } from 'app/components';
import s from './DeleteModal.module.scss';

interface Props {
  warehouseId: string;
  warehouseName: string;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (name: string) => void;
}

export const DeleteModalWarehouse = ({
  warehouseName,
  isOpen,
  handleClose,
  onSubmit,
  warehouseId,
}: Props) => {
  const handleSubmit = () => {
    onSubmit(warehouseId);
    handleClose();
  };

  return (
    <Modal
      onSubmit={handleSubmit}
      title="Удалить склад"
      isOpen={isOpen}
      handleClose={handleClose}
      submitButtonText="Удалить"
    >
      <div className={s.contentDeleteModal}>
        {`Вы действительно хотите удалить склад "${warehouseName}"?`}
      </div>
    </Modal>
  );
};
