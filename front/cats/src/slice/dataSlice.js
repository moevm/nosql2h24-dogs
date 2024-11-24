import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cat_id:""
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers:{
        setCatId: (state, action) => {
            console.log(action.payload)
            state.cat_id = action.payload;
        }

    }
})

export const {setCatId} = dataSlice.actions;
export default dataSlice.reducer;