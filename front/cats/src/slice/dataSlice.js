import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cat_id:"",
    all_cats:[]
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers:{
        setCatId: (state, action) => {
            console.log(action.payload)
            state.cat_id = action.payload;
        },
        setAllCats:(state,action)=>{
            state.all_cats = action.payload;
        }

    }
})

export const {setCatId, setAllCats} = dataSlice.actions;
export default dataSlice.reducer;