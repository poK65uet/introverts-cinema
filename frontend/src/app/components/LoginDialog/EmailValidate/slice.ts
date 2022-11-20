import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendCode } from 'queries/sendCode';
import { validateEmail } from 'queries/validateEmail';

export interface RegisterState {
  isLoading: boolean;
  OTP: number | undefined;
  isEmailValid: boolean | 'unfilled_email' | undefined;
  validatedEmail: string | undefined;
  isOTPSent: boolean;
}

const initialState: RegisterState = {
  isLoading: false,
  OTP: undefined,
  isEmailValid: undefined,
  validatedEmail: undefined,
  isOTPSent: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    reset: state => {
      state.isEmailValid = undefined;
      state.validatedEmail = undefined;
      state.isOTPSent = false;
      state.OTP = undefined;
    },
    storeOTP: (state, action) => {
      state.OTP = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(validateEmailThunk.pending, state => {
      state.isLoading = true;
      console.log('VALIDATING');
    });
    builder.addCase(validateEmailThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.check == true) {
        state.isEmailValid = true;
        state.validatedEmail = action.payload.email;
        console.log('VALIDATE SUCCESS');
      } else {
        state.validatedEmail = undefined;
        if (action.payload.check == 'unfilled_email') {
          state.isEmailValid = action.payload.check;
          console.log('VALIDATE FAILED');
        } else {
          state.isEmailValid = false;
          console.log('VALIDATE FAILED');
        }
      }
    });
    builder.addCase(validateEmailThunk.rejected, state => {
      state.isLoading = false;
      console.log('VALIDATE ERROR');
    });

    builder.addCase(sendCodeThunk.pending, state => {
      state.isLoading = true;
      console.log('SENDING OTP');
    });
    builder.addCase(sendCodeThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload == '201') {
        state.isOTPSent = true;
        console.log('SEND OTP SUCCESS');
      } else {
        if (action.payload == '200') {
          state.isOTPSent = false;
          console.log('SEND OTP FAILED');
        }
      }
    });
    builder.addCase(sendCodeThunk.rejected, state => {
      state.isLoading = false;
      state.isOTPSent = false;
      console.log('SEND OTP ERROR');
    });
  },
});

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export const validateEmailThunk = createAsyncThunk(
  'register/validateEmail',
  async (data: { email: string }, reject) => {
    await timeout(500);
    const receivedData = await validateEmail(data.email);
    return { check: receivedData, email: data.email };
  },
);

export const sendCodeThunk = createAsyncThunk(
  'register/sendCode',
  async (data: { email: string | undefined }, reject) => {
    const receivedData = await sendCode(data.email);
    return receivedData;
  },
);

export const registerActions = registerSlice.actions;

export default registerSlice.reducer;
