import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productList/productListSlice'
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
