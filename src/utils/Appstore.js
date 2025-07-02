import { configureStore } from "@reduxjs/toolkit";
import roleReducer from './roleSlice'
import membersReducer from './memberSlice'
const appStore = configureStore({

    reducer : {
         role: roleReducer,
          members: membersReducer,
    }
})

export default appStore