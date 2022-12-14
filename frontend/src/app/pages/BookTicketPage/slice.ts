import { createSlice, current } from '@reduxjs/toolkit';

export enum BookingStep {
  SELECT_MOVIE = 0,
  SELECT_SHOWTIME = 1,
  SELECT_SEATS = 2,
  MAKE_PAYMENT = 3,
}
export interface BookTicketState {
  isLoading: boolean;
  selectedMovie: string;
  selectedShowtime: any;
  selectedSeats: {
    id: number;
    showtimeId: number;
    name: string;
    seatCol?: number;
    seatRow?: number;
  }[];
  activeStep: BookingStep;
  completedSteps: { [index: number]: boolean };
  stepBack: boolean;
  timeStartPayment: number;
}

const initialState: BookTicketState = {
  isLoading: false,
  selectedMovie: '0',
  selectedShowtime: undefined,
  selectedSeats: <{ id: number; showtimeId: number; name: string }[]>[],
  activeStep: BookingStep.SELECT_MOVIE,
  completedSteps: {},
  stepBack: false,
  timeStartPayment: 0,
};

export const bookTicketSlice = createSlice({
  name: 'bookTicket',
  initialState: initialState,
  reducers: {
    loading: state => {
      state.isLoading = true;
    },
    loadingDone: state => {
      state.isLoading = false;
    },
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
      state.isLoading = true;
      state.selectedShowtime = action.payload;
      state.completedSteps[BookingStep.SELECT_SHOWTIME] = true;
      state.activeStep = BookingStep.SELECT_SEATS;
      state.stepBack = false;
    },
    resetShowtime: state => {
      state.selectedShowtime = undefined;
      state.completedSteps[BookingStep.SELECT_SHOWTIME] = false;
      state.activeStep = BookingStep.SELECT_SHOWTIME;
      state.stepBack = true;
    },
    selectSeat: (state, action) => {
      state.selectedSeats.push({
        id: action.payload.id,
        showtimeId: action.payload.showtimeId,
        name: action.payload.name,
        seatCol: action.payload.seatCol,
        seatRow: action.payload.seatRow,
      });
      state.selectedSeats = current(state.selectedSeats).sort(
        (seat1, seat2) => {
          return seat1.id - seat2.id;
        },
      );
    },
    unselectSeat: (state, action) => {
      let seat = {
        id: action.payload.id,
        showtimeId: action.payload.showtimeId,
        name: action.payload.name,
        seatCol: action.payload.seatCol,
        seatRow: action.payload.seatRow,
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
    paymentDone: state => {
      state.completedSteps[BookingStep.MAKE_PAYMENT] = true;
      state.stepBack = false;
    },
    paymentTimeOut: state => {
      state.timeStartPayment = 0;
    },
    resetPayment: state => {
      state.completedSteps[BookingStep.MAKE_PAYMENT] = false;
      state.activeStep = BookingStep.SELECT_MOVIE;
      state.stepBack = true;
    },
  },
});

export const bookTicketActions = bookTicketSlice.actions;

export default bookTicketSlice.reducer;
