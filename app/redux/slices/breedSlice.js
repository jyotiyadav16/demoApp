import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_LIST_URL } from '../../service/API';

export const fetchBreed = createAsyncThunk('list/fetchBreed', async (payload) => {
  const response = await axios.get(
    GET_LIST_URL,{params:payload}
  );
  return response;
});

export const breedSlice = createSlice({
  name: 'breeds',
  initialState: {
    breedList: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [fetchBreed.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchBreed.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.breedList.push(...action.payload.data);
    },
    [fetchBreed.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default breedSlice.reducer;
