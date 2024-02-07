import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeInterval: [],
  duration: 0
}

const IndicatorSlice = createSlice({
  initialState,
  name: 'indicator',
  reducers: {
    addTimeInterval: (state, action) => {
      state.timeInterval = action.payload
    },

    setDuration: (state, action) => {
      state.duration = action.payload
    }
  },
})

const { actions, reducer } = IndicatorSlice;
export default reducer;

export const {
  addTimeInterval,
  setDuration
} = actions;