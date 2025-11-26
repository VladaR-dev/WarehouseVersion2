import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';
import { RootState } from 'app/redux/store';
import { AddModalProduct, useAddProduct, useDeleteProduct, DeleteModalProduct } from 'app/Pages';
import { filteredProducts } from 'app/redux/slices/productsSlices';
import s from './ProductsPage.module.scss';

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const searchTerm = useSelector((state: RootState) => state.products.searchTerm);

  const { modalTypeAdd, handleCloseAddModal, openAddModal, handleAdd } = useAddProduct();
  const {
    modalTypeDelete,
    handleCloseDeleteModal,
    openDeleteModal,
    handleDelete,
    selectedProductId,
  } = useDeleteProduct();

  const visibleItems = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  return (
    <>
      <div className={s.containerProductsPage}>
        <div className={s.headerProducts}>
          <Typography variant="h1" gutterBottom>
            Продукты
          </Typography>

          <div className={s.rightSide}>
            <TextField
              id="outlined-search"
              variant="outlined"
              type="search"
              label="Поиск"
              value={searchTerm}
              onChange={(e) => {
                dispatch(filteredProducts(e.target.value));
              }}
            />
            <Button variant="contained" onClick={() => openAddModal()} className={s.btn}>
              Добавить товар
            </Button>
          </div>
        </div>

        <div className={s.itemsList}>
          {visibleItems.map((item) => (
            <div key={item.id} className={s.item}>
              {item.name}
              <div className={s.quantityAndButton}>
                {`${item.quantity} шт`}
                <Button
                  className={s.btn}
                  variant="outlined"
                  onClick={() => openDeleteModal(item.id)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalTypeAdd === 'add' && (
        <AddModalProduct
          onSubmit={handleAdd}
          handleClose={handleCloseAddModal}
          isOpen={modalTypeAdd === 'add'}
        />
      )}
      {modalTypeDelete === 'delete' && (
        <DeleteModalProduct
          products={products}
          onSubmit={handleDelete}
          handleClose={handleCloseDeleteModal}
          isOpen={modalTypeDelete === 'delete'}
          productId={selectedProductId}
        />
      )}
    </>
  );
};
