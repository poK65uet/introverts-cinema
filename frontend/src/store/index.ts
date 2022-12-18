import { configureStore } from '@reduxjs/toolkit';
import homeReducer from 'app/pages/HomePage/slice';
import moviesReducer from 'app/components/Movies/slice';
import bannersReducer from 'app/components/Banner/slice';
import loginReducer from 'app/components/LoginDialog/slice';
import registerReducer from 'app/components/LoginDialog/Register/slice';
import forgotPasswordReducer from 'app/components/LoginDialog/ForgotPassword/slice';
import loadingReducer from 'app/components/LoadingLayer/slice';
import bookTicketReducer from 'app/pages/BookTicketPage/slice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    banners: bannersReducer,
    movies: moviesReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    loading: loadingReducer,
    bookTicket: bookTicketReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
