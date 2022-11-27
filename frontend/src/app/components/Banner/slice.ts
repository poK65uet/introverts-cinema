import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBanners } from 'queries/banners';

export interface BannersState {
  isLoading: boolean;
  getBannerList: boolean;
  bannerList: string[];
}

const initialState: BannersState = {
  isLoading: false,
  getBannerList: false,
  bannerList: [],
};

export const bannersSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBannersThunk.pending, state => {
      state.isLoading = true;
      console.log('GETTING BANNERS');
    });
    builder.addCase(getBannersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bannerList = action.payload;
      state.getBannerList = true;
      console.log('GET BANNERS SUCCESS');
    });
    builder.addCase(getBannersThunk.rejected, state => {
      state.isLoading = false;
      console.log('GET BANNERS ERROR');
    });
  },
});

export const getBannersThunk = createAsyncThunk('banners', async () => {
  const recievedData = await getBanners();
  return recievedData;
});

export const bannerssActions = bannersSlice.actions;

export default bannersSlice.reducer;
