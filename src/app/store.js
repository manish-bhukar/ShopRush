import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/product-listSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
