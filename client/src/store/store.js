import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slice/user.slice"

const store = configureStore({
    reducer : {
        user : userSlice.reducer
    }
})

export default store ;