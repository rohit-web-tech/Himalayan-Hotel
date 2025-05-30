import {configureStore} from "@reduxjs/toolkit" ;
import userSlice from "./slice/user.js" ;

const store = configureStore({
    reducer : { 
        user : userSlice 
    }
})

export default store ;