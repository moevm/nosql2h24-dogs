import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name:"",
    age:0,
    passwordHash:"",
    image:"",
    creationDate:"",
    lastDate:"",
    favorites:[],
    admin:false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserData: (state, action) => {
            console.log(action.payload)
            state.name = action.payload.name;
            state.age = action.payload.age;
            state.passwordHash = action.payload.passwordHash;
            state.image = action.payload.image;
            state.creationDate = action.payload.creationDate;
            state.lastDate = action.payload.lastDate;
            state.favorites = action.payload.favorites;
            state.admin = action.payload.admin;
        }

    }
})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;