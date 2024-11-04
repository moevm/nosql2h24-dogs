import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filter_number:null,
    filter_string:null,
    filter_list:null,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers:{
        updateFilter: (state, action) => {
            state.filter_number = action.filter_number;
            state.filter_string = action.filter_string;
            state.filter_list = action.filter_list;
        }
    }
})

export const {updateFilter} = filterSlice.actions;
export default filterSlice.reducer;