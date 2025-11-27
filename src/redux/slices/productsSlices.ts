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
      quantity: 38,
    },
    {
      name: 'Сыр Российский',
      id: 'prod_ch_001',
      quantity: 25,
    },
    {
      name: 'Сыр Моцарелла',
      id: 'prod_ch_002',
      quantity: 18,
    },
    {
      name: 'Сыр Гауда',
      id: 'prod_ch_003',
      quantity: 22,
    },
  ],
  searchTerm: '',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;

      if (!quantity) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      if (quantity > 0) {
        state.items = state.items.map((item) => {
          if (item.id === id) {
            item.quantity -= quantity;
          }
          return item;
        });
      }
    },
    setSearchProduct: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, setSearchProduct } = productSlice.actions;
export default productSlice.reducer;
