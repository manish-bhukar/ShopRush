import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/product-listSlice';
import authReducer from '../features/Auth/authSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer
  },
});
