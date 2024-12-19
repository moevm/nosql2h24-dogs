import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cat_id:"",
    all_cats:[],
    commentsId:[],
    commentAuthor:"",
    commentId:0,
    sendComment: false,
    page:1,
    amountOfPages:1,
    value:[]
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
            state.commentAuthor = action.payload.author;
            state.commentId = action.payload.commentId;

        },
        setSendComment:(state)=>{
            state.sendComment = !state.sendComment;
        },
        setPage:(state,action)=>{
            state.page = action.payload;
        },
        setAmountOfPages:(state,action)=>{
            state.amountOfPages = action.payload;
        },
        setValue:(state,action)=>{
            state.value = action.payload;
        }

    }
})

export const {setCatId, setAllCats, addComment,
    setAuthor, setSendComment,
    setPage,setAmountOfPages, setValue} = dataSlice.actions;
export default dataSlice.reducer;