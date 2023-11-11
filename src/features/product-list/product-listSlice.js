import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts,fetchProductsByFilters,fetchAllBrand,fetchAllCategories, fetchProductById, createProduct, updateProduct } from "./product-listAPI";
const initialState = {
  products:[],
  brands: [],
  category: [],
  status: "idle",
  totalItems:0,
  selectedProduct:null,
};
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchAllProductsByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrand();
    return response.data;
  }
);
export const fetchAllCategoriesAsync= createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);

export const createProductAsync= createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync= createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
   clearselectedProduct:(state)=>{
    state.selectedProduct=null;
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchAllProductsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const indx=state.products.findIndex((product)=>product.id===action.payload.id);
        state.products[indx]=action.payload;
        
      })
  },
});

export const { clearselectedProduct } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.category;
export const selectedProductById = (state) => state.product.selectedProduct;
export const selecttotalItems = (state) => state.product.totalItems;
export default ProductSlice.reducer;
