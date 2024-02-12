import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeInterval: [],
  duration: 0,
  remainedToStart: 0,
  currentTime: 0,
  startTime: 0,
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
    },

    setRemainedToStart: (state, action) => {
      state.remainedToStart = action.payload;
    },

    setCurrentTime: (state, action) => {
      state.currentTime = action.payload
    },

    setStartTime: (state, action) => {
      state.startTime = action.payload
    }
  },
})

const { actions, reducer } = IndicatorSlice;
export default reducer;

export const {
  addTimeInterval,
  setDuration,
  setRemainedToStart,
  setCurrentTime,
  setStartTime
} = actions;