import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  isLoading: boolean;
  message: string;
  data: string;
}

const initialState: HomeState = {
  isLoading: false,
  message: '',
  data: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    loadData: state => {
      state.isLoading = true;
    },
    receivedData: state => {
      state.isLoading = false;
    },
    changeMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
