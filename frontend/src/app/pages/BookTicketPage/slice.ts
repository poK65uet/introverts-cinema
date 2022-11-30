import { createSlice } from '@reduxjs/toolkit';

export interface BookTicketState {
  selectedMovie: string;
}

const initialState: BookTicketState = {
  selectedMovie: '0',
};

export const bookTicketSlice = createSlice({
  name: 'bookTicket',
  initialState: initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    reset: state => {
      state.selectedMovie = '0';
    },
  },
});

export const bookTicketActions = bookTicketSlice.actions;

export default bookTicketSlice.reducer;
