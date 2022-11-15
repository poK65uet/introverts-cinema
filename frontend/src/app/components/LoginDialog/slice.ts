import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'queries/login';

export interface LoginState {
  isLoggedin: boolean;
  isLoading: boolean;
}

const initialState: LoginState = {
  isLoggedin:
    sessionStorage.getItem('token') !== undefined &&
    sessionStorage.getItem('token') !== null,
  isLoading: false,
};

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

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
  },
  extraReducers: builder => {
    builder.addCase(loginThunk.pending, state => {
      state.isLoading = true;
      console.log('LOGGING IN');
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('LOGIN SUCCESS');
        state.isLoading = false;

        state.isLoggedin = true;
      } else {
        console.log('LOGIN FAILED');
        state.isLoading = false;
      }
    });
    builder.addCase(loginThunk.rejected, state => {
      console.log('LOGIN ERROR');
      state.isLoading = false;
    });
  },
});

export const loginThunk = createAsyncThunk(
  'login/login',
  async (data: { email: string; password: string }, reject) => {
    await timeout(500);
    const success = await login(data.email, data.password);
    return success;
  },
);

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
