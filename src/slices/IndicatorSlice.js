import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    timeInterval: []
}

const IndicatorSlice = createSlice({
    initialState,
    name: 'indicator',
    reducers: {
      addTimeInterval: (state, action) =>{
        state.timeInterval = action.payload
      }
    },
})

const { actions, reducer } = IndicatorSlice;
export default reducer;

export const {
   addTimeInterval
} = actions;