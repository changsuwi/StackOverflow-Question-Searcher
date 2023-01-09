
import { createSlice } from '@reduxjs/toolkit';
import Tags from '../models/Tag';
import tagsAsyncThunk from './tagsAsyncThunk';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    list: [] as Tags[],
    selectedIndex: 0
  },
  reducers: {
    updateSelectedIndex: (state, { payload }) => {
      state.selectedIndex = payload;
    },
  },
  extraReducers: builder => {
    const { fetchTags } = tagsAsyncThunk;

    builder
      .addCase(fetchTags.pending, (state, action) => {})
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const tagsActions = tagsSlice.actions;

export default tagsSlice;
