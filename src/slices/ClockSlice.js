import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hourses: '0',
    minutes: '0'
}

const ClockSlice = createSlice({
    initialState,
    name: 'clock',
    reducers: {
        addHourses: (state, action) => {
            state.hourses = action.payload;
        },

        addMinutes: (state, action) => {
            state.minutes = action.payload;
        }
    },
})

const { actions, reducer } = ClockSlice;
export default reducer;

export const {
    addHourses,
    addMinutes
} = actions;