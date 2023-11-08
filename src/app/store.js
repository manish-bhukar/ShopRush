import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/product-listSlice';
import authReducer from '../features/Auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/Order/orderSlice'
import userReducer from '../User/userSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer
  },
});
