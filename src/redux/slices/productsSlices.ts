import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  name: string;
  id: string;
  quantity: number;
}

export interface ProductState {
  items: Product[];
  searchTerm: string;
}

const initialState: ProductState = {
  items: [
    {
      name: 'Шоколад молочный Alpen Gold',
      id: 'prod_sw_001',
      quantity: 50,
    },
    {
      name: 'Печенье овсяное с изюмом',
      id: 'prod_sw_002',
      quantity: 35,
    },
    {
      name: 'Конфеты шоколадные Ассорти',
      id: 'prod_sw_003',
      quantity: 60,
    },
    {
      name: 'Яблоки Гренни Смит',
      id: 'prod_fr_001',
      quantity: 120,
    },
    {
      name: 'Бананы спелые',
      id: 'prod_fr_002',
      quantity: 85,
    },
    {
      name: 'Апельсины марокканские',
      id: 'prod_fr_003',
      quantity: 76,
    },
    {
      name: 'Картофель молодой',
      id: 'prod_veg_001',
      quantity: 200,
    },
    {
      name: 'Морковь свежая',
      id: 'prod_veg_002',
      quantity: 95,
    },
    {
      name: 'Помидоры черри',
      id: 'prod_veg_003',
      quantity: 65,
    },
    {
      name: 'Гречневая крупа',
      id: 'prod_gr_001',
      quantity: 40,
    },
    {
      name: 'Рис шлифованный',
      id: 'prod_gr_002',
      quantity: 55,
    },
    {
      name: 'Овсяные хлопья',
      id: 'prod_gr_003',
      quantity: 3,
    },
    {
      name: 'Сыр Российский',
      id: 'prod_ch_001',
      quantity: 25,
    },
    {
      name: 'Сыр Моцарелла',
      id: 'prod_ch_002',
      quantity: 2,
    },
    {
      name: 'Сыр Гауда',
      id: 'prod_ch_003',
      quantity: 4,
    },
  ],
  searchTerm: '',
};

const deleteProductLogic = (
  state: ProductState,
  id: string,
  quantity: number,
) => {

  const product = state.items.find((product) => product.id === id);

  if (!product) return;

  product.quantity -= quantity;

  if (product.quantity <= 0) {
    state.items = state.items.filter((item) => item.id !== id);
  }
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    //для одиночного продукта(объект)
    deleteProduct: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      deleteProductLogic(state, id, quantity);
    },
    //для удаления массива объектов
    deleteProductsBatch: (state, action: PayloadAction<{ productId: string; quantity: number }[]>) => {
      action.payload.forEach(({ productId, quantity }) => {
        deleteProductLogic(state, productId, quantity);
      });
    },
    removeProductCompletely: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSearchProduct: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addProduct, deleteProduct,deleteProductsBatch, setSearchProduct, removeProductCompletely } = productSlice.actions;
export default productSlice.reducer;
