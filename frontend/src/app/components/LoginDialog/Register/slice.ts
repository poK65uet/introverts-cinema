import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendCode } from 'queries/sendCode';
import { validateEmail } from 'queries/validateEmail';
import { register } from 'queries/register';
import { notify } from 'app/components/MasterDialog';

export interface RegisterState {
  isLoading: boolean;
  OTP: number | undefined;
  isEmailValid: boolean | 'unfilled_email' | undefined;
  isOTPSent: boolean;
  isRegisterSuccessAccount: { email: string; password: string } | undefined;
}

const initialState: RegisterState = {
  isLoading: false,
  OTP: undefined,
  isEmailValid: undefined,
  isOTPSent: false,
  isRegisterSuccessAccount: undefined,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    reset: state => {
      state.isEmailValid = undefined;
      state.isOTPSent = false;
      state.OTP = undefined;
      state.isRegisterSuccessAccount = undefined;
    },
    changeEmail: state => {
      state.isEmailValid = undefined;
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
      if (action.payload == true) {
        state.isEmailValid = true;
        console.log('VALIDATE SUCCESS');
      } else {
        if (action.payload == 'unfilled_email') {
          state.isEmailValid = action.payload;
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
          notify({
            type: 'error',
            content: 'Gửi mã xác nhận thất bại',
            autocloseDelay: 1250,
          });
        }
      }
    });
    builder.addCase(sendCodeThunk.rejected, state => {
      state.isLoading = false;
      state.isOTPSent = false;
      console.log('SEND OTP ERROR');
      notify({
        type: 'error',
        content: 'Gửi mã xác nhận gặp lỗi',
        autocloseDelay: 1250,
      });
    });

    builder.addCase(registerThunk.pending, state => {
      state.isLoading = true;
      console.log('REGISTERING');
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status == '201') {
        state.isRegisterSuccessAccount = {
          email: action.payload.email,
          password: action.payload.password,
        };
        console.log('REGISTER SUCCESS');
      } else {
        if (action.payload.status == '200') {
          console.log('REGISTER FAILED - CODE EXPIRED/INCORRECT');
          notify({
            type: 'error',
            content: 'Kiểm tra lại mã OTP và thử lại',
          });
        } else {
          console.log('REGISTER FAILED');
          notify({
            type: 'error',
            content: 'Đăng ký không thành công',
            autocloseDelay: 1250,
          });
        }
      }
    });
    builder.addCase(registerThunk.rejected, state => {
      state.isLoading = false;
      console.log('REGISTER ERROR');
      notify({
        type: 'error',
        content: 'Đăng ký gặp lỗi',
        autocloseDelay: 1250,
      });
    });
  },
});

export const validateEmailThunk = createAsyncThunk(
  'register/validateEmail',
  async (data: { email: string }) => {
    const receivedData = await validateEmail(data.email);
    return receivedData;
  },
);

export const sendCodeThunk = createAsyncThunk(
  'register/sendCode',
  async (data: { email: string | undefined }) => {
    const receivedData = await sendCode(data.email);
    return receivedData;
  },
);

export const registerThunk = createAsyncThunk(
  'register/register',
  async (data: {
    email: string;
    password: string;
    otp: number;
    fullName: string;
    phone: string;
    birthDay: string;
  }) => {
    const receivedData = await register(
      data.email,
      data.password,
      data.otp,
      data.fullName,
      data.phone,
      data.birthDay,
    );
    return { status: receivedData, email: data.email, password: data.password };
  },
);

export const registerActions = registerSlice.actions;

export default registerSlice.reducer;
