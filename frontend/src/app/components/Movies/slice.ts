import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMovieById, getNewMovies, getUpcomingMovies } from 'queries/movies';

export interface MoviesState {
  getNewMovies: boolean;
  getUpcomingMovies: boolean;
  newMovieList: string[];
  upcomingMovieList: string[];
}

const initialState: MoviesState = {
  getNewMovies: false,
  getUpcomingMovies: false,
  newMovieList: ['', ''],
  upcomingMovieList: [''],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNewMoviesThunk.pending, state => {
      console.log('GETTING NEW MOVIES');
    });
    builder.addCase(getNewMoviesThunk.fulfilled, (state, action) => {
      state.newMovieList = action.payload;
      state.getNewMovies = true;
      console.log('GET NEW MOVIES SUCCESS');
    });
    builder.addCase(getNewMoviesThunk.rejected, state => {
      console.log('GET NEW MOVIES ERROR');
    });
    builder.addCase(getUpcomingMoviesThunk.pending, state => {
      console.log('GETTING UPCOMING MOVIES');
    });
    builder.addCase(getUpcomingMoviesThunk.fulfilled, (state, action) => {
      state.upcomingMovieList = action.payload;
      state.getUpcomingMovies = true;
      console.log('GET UPCOMING MOVIES SUCCESS');
    });
    builder.addCase(getUpcomingMoviesThunk.rejected, state => {
      console.log('GET UPCOMING MOVIES ERROR');
    });
  },
});

export const getNewMoviesThunk = createAsyncThunk(
  'movies/newMovies',
  async () => {
    const recievedData = await getNewMovies();
    return recievedData;
  },
);

export const getUpcomingMoviesThunk = createAsyncThunk(
  'movies/upcomingMovies',
  async () => {
    const recievedData = await getUpcomingMovies();
    return recievedData;
  },
);

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;
