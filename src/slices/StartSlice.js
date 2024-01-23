import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ScheduleController: [
        {
            scheduleName: 'Cтандартное расписание',
            schedule: [
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
                ['18:10', '23:00'],
            ],
            id: 0,
        }
    ],

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
        }
    },
})

const { actions, reducer } = StartSlice;
export default reducer;

export const {
    addScheduleListItem,
    addNewScheduleList,
    setScheduleName,
    changeItemId
} = actions;