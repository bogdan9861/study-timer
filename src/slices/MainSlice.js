import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    schedules: [],
    formatedTime: '',
    nowIndex: 0,
    ended: false
}

const MainSlice = createSlice({
    initialState,
    name: 'main',
    reducers: {
        addFormatedTime: (state, action) => {
            state.formatedTime = action.payload
        },

        addNowIndex: (state, action) => {
            state.nowIndex = action.payload
        },

        toggleEnded: (state, action) => {
            state.ended = action.payload
        },

        addSchedules: (state, action) => {
            state.schedules = action.payload
        },

        addDefaultSchedules: (state, action) => {
            state.schedules = [
                ['08:00', '09:30'],
                ['09:30', '09:40'],
                ['09:40', '11:10'],
                ['11:10', '11:20'],
                ['11:20', '12:50'],
                ['12:50', '13:10'],
                ['13:10', '14:40'],
                ['14:40', '14:50'],
                ['14:50', '16:20'],
                ['16:20', '16:40'],
                ['16:40', '18:10'],
            ]
        }
    },
})

const { actions, reducer } = MainSlice;
export default reducer;

export const {
    addFormatedTime,
    addNowIndex,
    toggleEnded,
    addSchedules,
    addDefaultSchedules
} = actions;