import {createSlice} from "@reduxjs/toolkit" ; 
const initialState = { 
    isLoggedIn : false ,
    userData : null 
};

const userSlice = createSlice({
    name : "user" ,
    initialState,
    reducers : {
        login : (state,action) => {
            state.isLoggedIn = true ;
            state.userData = action.payload ;
            console.log("Payload :" , action.payload)
        },
        logout : (state:any,_) => {
            state.isLoggedIn = false ;
            state.user = null ;
        },
    }
});

export const {login,logout} = userSlice.actions ;
export default userSlice.reducer ;