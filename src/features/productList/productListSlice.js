import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';
import { fetchAllBrands, fetchAllCategories, fetchAllProd, fetchAllProductsByFilters, fetchProductById } from './productListAPI';

const initialState = {
  products: [],
  totalItems:0,
  brands:[],
  categories:[],
  status: 'idle',
  selectedProduct:null
};
 
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProd();
    
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    
    return response.data;
  }
);
export const fetchCategoriessAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchAllCategories();
    
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchAllBrands();
    
    return response.data;
  }
);
export const fetchProductsByFiltersAsync=createAsyncThunk(
  'product/fetchProductsByFilters',
  async({filter,sort,pagination})=>{
    console.log(filter);
    const response = await fetchAllProductsByFilters(filter,sort,pagination);
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
   reducers: {
    increment: (state) => {
    
      state.value += 1;
    },

  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriessAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriessAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.selectedProduct = action.payload;
      })
  },
});

export const { increment } = productSlice.actions;


export const selectTotalItems = (state) => state.product.totalItems;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectAllCategories= (state) => state.product.categories;
export const selectProductById= (state) => state.product.selectedProduct;


export default productSlice.reducer;
