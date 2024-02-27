import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    timeInterval: 10
}

const SettingsSlice = createSlice({
    initialState,
    name: 'main',
    reducers: {
        applyTimeInterval: (state, action) => {
            state.timeInterval = action.payload
        }
    },
})

const { actions, reducer } = SettingsSlice;
export default reducer;

export const {
    applyTimeInterval
} = actions;