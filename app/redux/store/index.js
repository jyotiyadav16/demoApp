import { configureStore } from '@reduxjs/toolkit';
import breedReducer from '../slices/breedSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    breeds: breedReducer,
    auth:authReducer
  },
});
