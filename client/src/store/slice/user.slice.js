import {configureStore,createSlice} from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoggedIn : false 
}

const userSlice = createSlice({
    name : "User" ,
    initialState ,
    reducers : {
        login : (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.user = null ;
            state.isLoggedIn = false ;
        }
    }
});

export const {login,logout} = userSlice.actions ;

export default userSlice ;