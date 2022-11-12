import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
	isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false
};


export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    load: (state) => {
      state.isLoading = true
    },
    finish: (state) => {
      state.isLoading = false
    }
	}
});


export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
