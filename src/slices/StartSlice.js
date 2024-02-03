import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ScheduleController: [],
    loading: false,
}

const StartSlice = createSlice({
    initialState,
    name: 'indicator',
    reducers: {
        addScheduleListItem: (state, action) => {
            state.ScheduleController.push(action.payload);
        },

        addNewScheduleList: (state, action) => {
            state.ScheduleController = action.payload;
        },

        setScheduleName: (state, action) => {
            state.scheduleName = action.payload;
        },

        changeItemId: (state, action) => {
            state.ScheduleController[action.payload].id = action.payload;
        },

        changeLoading: (state, action) => {
            state.loading = action.payload
        }
    },
})

const { actions, reducer } = StartSlice;
export default reducer;

export const {
    addScheduleListItem,
    addNewScheduleList,
    setScheduleName,
    changeItemId,
    changeLoading
} = actions;