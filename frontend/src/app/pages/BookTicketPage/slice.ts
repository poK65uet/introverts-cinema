import { createSlice, current } from '@reduxjs/toolkit';

export enum BookingStep {
  SELECT_MOVIE = 0,
  SELECT_SHOWTIME = 1,
  SELECT_SEATS = 2,
  MAKE_PAYMENT = 3,
}
export interface BookTicketState {
  selectedMovie: string;
  selectedShowtime: number;
  selectedSeats: { id: number; name: string }[];
  activeStep: BookingStep;
  completedSteps: { [index: number]: boolean };
  stepBack: boolean;
  timeStartPayment: number;
}

const initialState: BookTicketState = {
  selectedMovie: '0',
  selectedShowtime: 0,
  selectedSeats: <{ id: number; name: string }[]>[],
  activeStep: BookingStep.SELECT_MOVIE,
  completedSteps: {},
  stepBack: false,
  timeStartPayment: 0,
};

export const bookTicketSlice = createSlice({
  name: 'bookTicket',
  initialState: initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
      state.completedSteps[BookingStep.SELECT_MOVIE] =
        state.selectedMovie !== '0';
      state.activeStep = BookingStep.SELECT_SHOWTIME;
      state.stepBack = false;
    },
    resetMovie: state => {
      state.selectedMovie = '0';
      state.completedSteps[BookingStep.SELECT_MOVIE] = false;
      state.activeStep = BookingStep.SELECT_MOVIE;
    },
    selectShowtime: (state, action) => {
      state.selectedShowtime = action.payload;
      state.completedSteps[BookingStep.SELECT_SHOWTIME] = true;
      state.activeStep = BookingStep.SELECT_SEATS;
      state.stepBack = false;
    },
    resetShowtime: state => {
      state.selectedShowtime = 0;
      state.completedSteps[BookingStep.SELECT_SHOWTIME] = false;
      state.activeStep = BookingStep.SELECT_SHOWTIME;
      state.stepBack = true;
    },
    selectSeat: (state, action) => {
      state.selectedSeats.push({
        id: action.payload.id,
        name: action.payload.name,
      });
    },
    unselectSeat: (state, action) => {
      let seat = {
        id: action.payload.id,
        name: action.payload.name,
      };
      let stateTemp = state.selectedSeats;

      stateTemp = stateTemp.filter(selectedSeat => selectedSeat.id != seat.id);
      state.selectedSeats = stateTemp;
    },
    resetSeat: state => {
      state.selectedSeats = [];
      state.completedSteps[BookingStep.SELECT_SEATS] = false;
      state.activeStep = BookingStep.SELECT_SHOWTIME;
      state.stepBack = true;
    },
    selectSeatsDone: state => {
      state.completedSteps[BookingStep.SELECT_SEATS] = true;
      state.activeStep = BookingStep.MAKE_PAYMENT;
      state.stepBack = false;
    },
    reSelectSeats: state => {
      state.completedSteps[BookingStep.SELECT_SEATS] = false;
      state.activeStep = BookingStep.SELECT_SEATS;
      state.stepBack = true;
    },
    startPayment: (state, action) => {
      if (state.timeStartPayment == 0) state.timeStartPayment = action.payload;
    },
    paymentTimeOut: state => {
      state.timeStartPayment = 0;
    },
  },
});

export const bookTicketActions = bookTicketSlice.actions;

export default bookTicketSlice.reducer;
