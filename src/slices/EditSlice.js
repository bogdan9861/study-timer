import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    edited: null
}

const EditSlice = createSlice({
    initialState,
    name: 'edit',
    reducers: {
        setEditedId: (state, action) => {
            state.edited = action.payload;
        }
    }
})


const { actions, reducer } = EditSlice;
export default reducer;
export const { setEditedId } = actions; 