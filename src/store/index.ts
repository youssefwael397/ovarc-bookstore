import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { bookstoreApi } from './bookstoreApi';
import storeReducer from './storeSlice';
import bookReducer from './bookSlice';
import authorReducer from './authorsSlice';

const store = configureStore({
  reducer: {
    [bookstoreApi.reducerPath]: bookstoreApi.reducer,
    storeData: storeReducer,
    bookData: bookReducer,
    authorsData: authorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookstoreApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
