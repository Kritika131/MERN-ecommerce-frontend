import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { checkUser, createUser, signOut} from './authAPI'
import { updateUser } from '../user/userAPI'

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
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userId)=>{
    const response = await signOut(userId);
    // console.log("respone --",response);
    return response.data;
  }
)
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData,{rejectWithValue})=>{
    try{
      const response = await checkUser(userData);
      // console.log("respone --",response);
      return response.data;

    } catch(error){
       console.log(error);
       return rejectWithError(error)
    }
  }
)
//checkoutPage
// export const updateUserAsync = createAsyncThunk(
//   'user/updateUser',
//   async (update)=>{
//     const response = await updateUser(update);
//     // console.log("respone --",response);
//     return response.data;
//   }
// )


export const createUserSlice = createSlice({
  name:'auth',
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
        state.error = action.payload;
      })
      
      .addCase(signOutAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.loggedInUser = null;
      })
  }

})

export const selectLoggedInUser = (state)=>state.auth.loggedInUser
export const selectError = (state)=>state.user.error
export default createUserSlice.reducer;