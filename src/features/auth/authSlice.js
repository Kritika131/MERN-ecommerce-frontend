import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { checkUser, createUser } from './authAPI'

const initialState = {
  loggedInUser: null,
  status:'idle',
  error:null
}
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData)=>{
    const response = await createUser(userData);
    // console.log("respone --",response);
    return response;
  }
)
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData)=>{
    const response = await checkUser(userData);
    // console.log("respone --",response);
    return response.data;
  }
)


export const createUserSlice = createSlice({
  name:'user',
  initialState,
  reducers:{

  },

  extraReducers:(builder)=>{
    builder
      .addCase(createUserAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.error = action.error;
      })
  }

})

export const selectLoggedInUser = (state)=>state.user.loggedInUser
export const selectError = (state)=>state.user.error
export default createUserSlice.reducer;