import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'queries/login';
import { getUserProfile } from 'queries/user';
import { notify } from 'app/components/MasterDialog/index';

export interface LoginState {
  isLoggedin: boolean;
  isLoading: boolean;
  dialogAction: 'login' | 'register';
  user: any;
}

const initialState: LoginState = {
  isLoggedin:
    sessionStorage.getItem('token') !== undefined &&
    sessionStorage.getItem('token') !== null,
  user: undefined,
  isLoading: false,
  dialogAction: 'login',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    logout: state => {
      state.isLoggedin = false;
      state.user = [];
      sessionStorage.removeItem('token');
      notify({
        type: 'info',
        content: 'Đã đăng xuất',
        autocloseDelay: 1250,
      });
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
      if (action.payload.success) {
        state.isLoggedin = true;
        notify({
          type: 'success',
          content: 'Đăng nhập thành công',
          autocloseDelay: 1250,
        });
        state.user = action.payload.user;
        console.log('LOGIN SUCCESS');
      } else {
        console.log('LOGIN FAILED');
        notify({
          type: 'error',
          content: 'Đăng nhập thất bại',
          autocloseDelay: 1250,
        });
      }
    });
    builder.addCase(loginThunk.rejected, state => {
      state.isLoading = false;
      console.log('LOGIN ERROR');
      notify({
        type: 'error',
        content: 'Đăng nhập gặp lỗi',
        autocloseDelay: 1250,
      });
    });
    builder.addCase(getUserProfileThunk.pending, state => {
      state.isLoading = true;
      console.log('GETTING PROFILE');
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.user = action.payload;
        console.log('GET PROFILE SUCCESS');
      } else {
        console.log('GET PROFILE FAILED');
        notify({
          type: 'error',
          content: 'Lấy dữ liệu người dùng thất bại',
          autocloseDelay: 1250,
        });
      }
    });
    builder.addCase(getUserProfileThunk.rejected, state => {
      state.isLoading = false;
      console.log('GET PROFILE ERROR');
      notify({
        type: 'error',
        content: 'Lấy dữ liệu người dùng gặp lỗi',
        autocloseDelay: 1250,
      });
    });
  },
});

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export const loginThunk = createAsyncThunk(
  'login/login',
  async (data: { email: string; password: string }, reject) => {
    const response = await login(data.email, data.password);
    await timeout(500);
    return { success: response && response?.user, user: response.user };
  },
);

export const getUserProfileThunk = createAsyncThunk(
  'user/profile',
  async () => {
    const response = await getUserProfile();
    return response;
  },
);

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
