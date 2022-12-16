import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'queries/login';
import { getUserProfile } from 'queries/users';
import { notify } from 'app/components/MasterDialog/index';

export enum DialogActions {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
}
export interface LoginState {
  isLoggedin: boolean;
  isRequireLogin: boolean;
  isLoading: boolean;
  dialogAction: DialogActions;
  user: any;
  isAdmin: boolean;
}

const initialState: LoginState = {
  isLoggedin:
    sessionStorage.getItem('token') !== undefined &&
    sessionStorage.getItem('token') !== null,
  isRequireLogin: false,
  isLoading: false,
  dialogAction: DialogActions.LOGIN,
  user: undefined,
  isAdmin: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    logout: state => {
      state.isLoggedin = false;
      state.user = [];
      state.isAdmin = false;
      sessionStorage.removeItem('token');
      notify({
        type: 'info',
        content: 'Đã đăng xuất',
        autocloseDelay: 1250,
      });
    },
    requireLogin: state => {
      state.isRequireLogin = true;
    },
    denyRequire: state => {
      state.isRequireLogin = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAdmin = state.user.Roles.some((role: any) => role.id == 1);
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
        if (state.user.Roles.some((role: any) => role.id == 1)) {
          window.location.href = '/admin';
          state.isAdmin = true;
        }
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
