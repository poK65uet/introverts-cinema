import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'queries/login';

export interface LoginState {
  isLoggedin: boolean;
  isLoading: boolean;
  dialogAction: 'login' | 'register';
}

const initialState: LoginState = {
  isLoggedin:
    sessionStorage.getItem('token') !== undefined &&
    sessionStorage.getItem('token') !== null,
  isLoading: false,
  dialogAction: 'login',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    logout: state => {
      state.isLoggedin = false;
      sessionStorage.removeItem('token');
    },
    keepLogin: state => {
      state.isLoggedin = true;
    },
    changeAction: (state, action) => {
      state.dialogAction = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginThunk.pending, state => {
      state.isLoading = true;
      console.log('LOGGING IN');
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.isLoggedin = true;
        console.log('LOGIN SUCCESS');
      } else {
        console.log('LOGIN FAILED');
      }
    });
    builder.addCase(loginThunk.rejected, state => {
      state.isLoading = false;
      console.log('LOGIN ERROR');
    });
  },
});

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export const loginThunk = createAsyncThunk(
  'login/login',
  async (data: { email: string; password: string }, reject) => {
    const success = await login(data.email, data.password);
    await timeout(500);
    return success;
  },
);

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
