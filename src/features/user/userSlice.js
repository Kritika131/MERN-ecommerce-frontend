import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

const initialState = {
  value: 0,
  status: 'idle',
  userInfo:null, //this info will be used in case of detailed user info, while auth will only be used for loggedInUser id etc checks
  userOrders:[]
};
 
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'counter/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchLoggedInUserByIdAsync = createAsyncThunk(
  'counter/fetchLoggedInUserById',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'counter/updateUser',
  async (id) => {
    const response = await updateUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
   reducers: {
    increment: (state) => {
    
      state.value += 1;
    },

  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from loggeg-in user info
        state.userOrders= action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders= action.payload;
      })
      .addCase(fetchLoggedInUserByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo= action.payload;
      })
  },
});

// export const { increment } = counterSlice.actions;


export const selectfetchloggedInUserOrders = (state) => state.user.userOrders;
export const selectfetchloggedInUser = (state) => state.user.userInfo;



export default userSlice.reducer;
