import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filter_number:[],
    filter_bigger_number:[],
    filter_temperament:[],
    filter_country:[],
    filter_country_codes:[],
    part_name:""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers:{
        updateFilter: (state, action) => {
            console.log(action.payload)
            state.filter_number = action.payload.filter_number;
            state.filter_bigger_number = action.payload.filter_bigger_number;
            state.filter_temperament = action.payload.filter_temperament;
            state.filter_country = action.payload.filter_country;
            state.filter_country_codes = action.payload.filter_country_codes;
        },
        setSearch: (state, action) => {
            console.log(action.payload)
            state.part_name = action.payload;
        }

    }
})

export const {updateFilter, setSearch} = filterSlice.actions;
export default filterSlice.reducer;