import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filter_number:[],
    filter_string:[],
    filter_list:[]
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers:{
        updateFilter: (state, action) => {
            console.log(action.payload)
            state.filter_number = action.payload.filter_number;
            state.filter_string = action.payload.filter_string;
            state.filter_list = action.payload.filter_list;
        },

    }
})

export const {updateFilter, increment} = filterSlice.actions;
export default filterSlice.reducer;