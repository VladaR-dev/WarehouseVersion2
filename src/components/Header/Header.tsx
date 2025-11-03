import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <Link to="/">
        <Typography variant="h1" gutterBottom>
          Мой<span>склад</span>
        </Typography>
      </Link>
    </div>
  );
};
