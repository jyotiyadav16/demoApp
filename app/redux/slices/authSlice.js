import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, LOGIN_URL } from '../../service/API';

export const fetchLogin = createAsyncThunk('list/fetchLogin', async (payload) => {
  const response = await axios.post(
    LOGIN_URL, payload
  );
  return response;
});

export const postRegistration = createAsyncThunk('list/postRegistration', async (payload) => {
  const response = await axios.post(
    BASE_URL, payload
  );
  return response;
});


export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    token: undefined,
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [fetchLogin.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = (action.payload.data.token);
    },
    [postRegistration.pending]: (state, action) => {
      state.status = 'loading';
    },
    [postRegistration.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [postRegistration.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default AuthSlice.reducer;
