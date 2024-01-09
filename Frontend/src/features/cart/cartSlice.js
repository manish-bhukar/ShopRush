import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,fetchItemsByUserId, updateCart,deleteCartItem,resetCart } from './cartAPI';

const initialState = {
  status: 'idle',
  items:[],
  cartLoaded:false
};
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const updateItemsAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemsAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
        state.cartLoaded=true
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
        state.cartLoaded=true
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const indx=state.items.findIndex(item=>item.id===action.payload.id);
        state.items[indx]=action.payload;
      })
      .addCase(deleteItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const indx=state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(indx,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })
  },
});
 

export const { increment, incrementByAmount } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartLoaded=(state)=>state.cart.cartLoaded;
export default counterSlice.reducer;
