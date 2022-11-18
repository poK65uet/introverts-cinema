import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface RegisterState {
  verificationCode: number | undefined;
  isEmailValid: boolean;
}

const initialState: RegisterState = {
  verificationCode: undefined,
  isEmailValid: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    validateEmail: state => {},
  },

  extraReducers: builder => {
    builder.addCase(registerThunk.pending, state => {});
    builder.addCase(registerThunk.fulfilled, (state, action) => {});
    builder.addCase(registerThunk.rejected, state => {});
  },
});

export const registerThunk = createAsyncThunk(
  'register/register',
  async (data: { email: string; password: string }, reject) => {
    return {};
    //const success = await validateEmail(data.email, data.password);
    //return success;
  },
);

export const registerActions = registerSlice.actions;

export default registerSlice.reducer;
