import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { addToCart, deleteItemFromCart, fetchCartItemById, resetCart, updateCart } from './cartAPI'

const initialState = {
  items: [],
  status:'idle',
 
}
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item)=>{
    const response = await addToCart(item);
    // console.log("respone --",response);
    return response.data;
  }
)
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId)=>{
    const response = await fetchCartItemById(userId);
    console.log("respone cart id --",response);
    return response.data;
  }
)

export const updateCartItemsAsync = createAsyncThunk(
  'cart/updateCart',
  async (update)=>{
    const response = await updateCart(update);
    // console.log("respone --",response);
    return response.data;
  }
)
export const deleteCartItemsAsync = createAsyncThunk(
  'cart/deleteCart',
  async (itemId)=>{
    const response = await deleteItemFromCart(itemId);
    // console.log("respone --",response);
    return response.data;
  }
)
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId)=>{
    const response = await resetCart(userId);
    // console.log("respone --",response);
    return response.data;
  }
)



export const addToCartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{

  },

  extraReducers:(builder)=>{
    builder
      .addCase(addToCartAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.items = action.payload;
      })
      
      .addCase(updateCartItemsAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(updateCartItemsAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        const idx = state.items.findIndex(item=>item.id===action.payload.id)
        state.items[idx] = action.payload;
      })
      .addCase(deleteCartItemsAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(deleteCartItemsAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        const idx = state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(idx,1) 
      })
      .addCase(resetCartAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.items=[] 
      })
      
  }

})

export const selectCartItem = (state)=>state.cart.items;

export default addToCartSlice.reducer;