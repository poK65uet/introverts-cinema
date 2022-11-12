import { configureStore } from '@reduxjs/toolkit';
import homeReducer from 'app/pages/HomePage/slice';
import loginReducer from 'app/components/LoginDialog/slice'
import loadingReducer from 'app/components/LoadingLayer/slice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    login: loginReducer,
    loading: loadingReducer
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
