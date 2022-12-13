import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendForgotPasswordCode } from 'queries/sendCode';
import { resetPassword } from 'queries/forgotPassword';
import { notify } from 'app/components/MasterDialog';

export interface ForgotPasswordState {
  isLoading: boolean;
  OTP: number | undefined;
  isOTPSent: boolean;
  isResetPasswordSuccess: boolean;
}

const initialState: ForgotPasswordState = {
  isLoading: false,
  OTP: undefined,
  isOTPSent: false,
  isResetPasswordSuccess: false,
};

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {
    reset: state => {
      state.isOTPSent = false;
      state.OTP = undefined;
      state.isResetPasswordSuccess = false;
    },
    storeOTP: (state, action) => {
      state.OTP = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(sendForgotPasswordCodeThunk.pending, state => {
      state.isLoading = true;
      console.log('SENDING OTP');
    });
    builder.addCase(sendForgotPasswordCodeThunk.fulfilled, (state, action) => {
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
    builder.addCase(sendForgotPasswordCodeThunk.rejected, state => {
      state.isLoading = false;
      state.isOTPSent = false;
      console.log('SEND OTP ERROR');
      notify({
        type: 'error',
        content: 'Gửi mã xác nhận gặp lỗi',
        autocloseDelay: 1250,
      });
    });

    builder.addCase(resetPasswordThunk.pending, state => {
      state.isLoading = true;
      console.log('RESETTING PASSWORD');
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.length > 0) {
        state.isResetPasswordSuccess = true;
        console.log('RESET PASSWORD SUCCESS');
        notify({
          type: 'success',
          content: 'Tạo mật khẩu mới thành công',
          autocloseDelay: 1750,
        });
      } else {
        console.log('RESET PASSWORD FAILED');
        notify({
          type: 'error',
          content: 'Tạo mật khẩu mới thất bại',
          autocloseDelay: 1250,
        });
      }
    });
    builder.addCase(resetPasswordThunk.rejected, state => {
      state.isLoading = false;
      state.isOTPSent = false;
      console.log('RESET PASSWORD ERROR');
      notify({
        type: 'error',
        content: 'Tạo mật khẩu mới gặp lỗi',
        autocloseDelay: 1250,
      });
    });
  },
});

export const sendForgotPasswordCodeThunk = createAsyncThunk(
  'forgot-password/send-code',
  async (data: { email: string }) => {
    const receivedData = await sendForgotPasswordCode(data.email);
    return receivedData;
  },
);

export const resetPasswordThunk = createAsyncThunk(
  'forgot-password/reset-password',
  async (data: { email: string; password: string; otp: number }) => {
    const receivedData = await resetPassword(
      data.email,
      data.password,
      data.otp,
    );
    return receivedData;
  },
);

export const forgotPasswordActions = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
