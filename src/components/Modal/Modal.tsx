import React, { ReactNode, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import s from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
  submitButtonText?: string;
  onSubmit: () => void;
}

export const Modal = ({
  children,
  isOpen,
  handleClose,
  title,
  submitButtonText = 'Сохранить',
  onSubmit,
}: Props) => {
  if (!isOpen) return null;

  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const clickOutside = (e: any) => {
    if (!contentRef.current?.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div onClick={(e) => clickOutside(e)} ref={rootRef} className={s.modalWrapper}>
      <div ref={contentRef} className={s.modalPosition}>
        <div className={s.modalContent}>
          <div onClick={handleClose} className={s.close}>
            X
          </div>
          <Typography variant="h5" className={s.title} gutterBottom>
            {title}
          </Typography>

          <div className={s.content}>{children}</div>

          <div className={s.buttons}>
            <Button variant="outlined" onClick={handleClose} className={s.btn}>Закрыть</Button>
            <Button variant="contained" onClick={onSubmit} className={s.btn}>{submitButtonText}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
