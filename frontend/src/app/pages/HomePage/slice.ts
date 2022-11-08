import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  message: string
  data: string
}

const initialState: HomeState = {
  loading: 'idle',
  message: '',
  data: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    loadData: (state, action) => {
      if(state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    receivedData: (state, action) => {
      if(state.loading === 'pending'){
        state.loading = 'idle'
        state.data = action.payload
      }
    },
    changeMessage: (state, action) => { 
      state.message = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
