import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'app/redux/slices/productsSlices';

export interface WarehouseType {
  name: string;
  id: string;
  products: Product[];
}

export interface WarehousesState {
  items: WarehouseType[];
  filteredItems: WarehouseType[];
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
  filteredItems: [],
  selectedWarehouseId: null,
};

const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState: initialState,
  reducers: {
    addWarehouse: (state, action: PayloadAction<WarehouseType>) => {
      state.items.push(action.payload);
    },
    editWarehouse: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.items.map((item) => {
        if (item.id === id) {
          item.name = name;
        }
        return item;
      });
    },
    removeWarehouse: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    filteredWarehouses: (state, action: PayloadAction<string>) => {
      state.filteredItems = state.items.filter(({ name }) =>
        name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
});

export const { addWarehouse, editWarehouse, removeWarehouse, filteredWarehouses } =
  warehousesSlice.actions;
export default warehousesSlice.reducer;
