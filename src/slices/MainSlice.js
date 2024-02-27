import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    schedules: [],
    formatedTime: '',
    nowIndex: 0,
    ended: false,
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
    },
})

const { actions, reducer } = MainSlice;
export default reducer;

export const {
    addFormatedTime,
    addNowIndex,
    toggleEnded,
    addSchedules,
} = actions;