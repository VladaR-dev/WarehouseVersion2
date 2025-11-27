import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'app/redux/slices/productsSlices';

export interface WarehouseType {
  name: string;
  id: string;
  products: Product[];
}

export interface WarehousesState {
  items: WarehouseType[];
  searchTerm: string;
  selectedWarehouseId: string | null;
}

const initialState: WarehousesState = {
  items: [
    { name: 'Сладости', id: '0', products: [] },
    { name: 'Фрукты', id: '1', products: [] },
    { name: 'Овощи', id: '2', products: [] },
    { name: 'Крупа', id: '3', products: [] },
    { name: 'Сыры', id: '4', products: [] },
  ],
  searchTerm: '',
  selectedWarehouseId: null,
};
//filtereItems вычисляется в компоненте
const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState: initialState,
  reducers: {
    addWarehouse: (state, action: PayloadAction<WarehouseType>) => {
      state.items.push(action.payload);
    },
    editWarehouse: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.items = state.items.map((item) => (item.id === id ? { ...item, name } : item));
    },
    removeWarehouse: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    filteredWarehouses: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addWarehouse, editWarehouse, removeWarehouse, filteredWarehouses } =
  warehousesSlice.actions;
export default warehousesSlice.reducer;
