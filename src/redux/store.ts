import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './slices/warehouseSlice';
import productReducer from './slices/productsSlices';

export const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
