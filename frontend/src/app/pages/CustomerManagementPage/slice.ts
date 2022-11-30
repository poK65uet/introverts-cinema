import { createSlice } from '@reduxjs/toolkit';

export interface CustomerState {
  message: string
  page: number
  pageSize: number
  data: {count: number, rows: readonly any[]}
}

const initialState: CustomerState = {
  message: '',
  page: 0,
  pageSize: 5,
  data: {count:0, rows: []},
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    loadData: (state, action) => {
    },
    receivedData: (state, action) => {
    },
    changeMessage: (state, action) => { 
      state.message = action.payload;
    },
  },
});

export const customerActions = customerSlice.actions;

export default customerSlice.reducer;
