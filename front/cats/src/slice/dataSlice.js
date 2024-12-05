import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cat_id:"",
    all_cats:[],
    commentsId:[],
    commentAuthor:""
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
        },
        addComment:(state,action)=>{
            state.commentsId.push(action.payload)
        },
        setAuthor:(state,action)=>{
            state.author = action.payload;
        }

    }
})

export const {setCatId, setAllCats, addComment, setAuthor} = dataSlice.actions;
export default dataSlice.reducer;