
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'queries/login';
import { useDispatch } from 'react-redux';

export interface LoginState {
	isLoggedin: boolean
}

const initialState: LoginState = {
  isLoggedin: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoggedin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      console.log("LOGGING IN");
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if(action.payload) {
        console.log("LOGIN SUCCESS");
        state.isLoggedin = true;
      } else {
        console.log("LOGIN FAILED");
      }
    });
    builder.addCase(loginThunk.rejected, (state) => {
      console.log("LOGIN ERROR");
    });
  }
});

export const loginThunk = createAsyncThunk('login/login',
async (data : {email: string, password: string} , reject) => {
    const success = await login(data.email, data.password)    
    return success
})

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;

