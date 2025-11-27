import React from 'react';
import { Link } from 'react-router-dom';
import { MdShelves } from 'react-icons/md';
import { GiShinyApple } from 'react-icons/gi';
import cn from 'classnames';
import s from './Dashboard.module.scss';

export const Dashboard = () => {
  return (
    <div className={s.dashboardContainer}>
      <Link to={'/warehouses'}>
        <div className={cn(s.item, s.itemWarehouses)}>
          <MdShelves />
          <p>Склады</p>
        </div>
      </Link>
      <Link to={'/products'}>
        <div className={s.item}>
          <GiShinyApple />
          <p>Продукты</p>
        </div>
      </Link>
    </div>
  );
};
