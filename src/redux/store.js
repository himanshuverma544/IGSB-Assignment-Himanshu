import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/users";


const store = configureStore({
  reducer: {
    usersReducer
  }
});

export default store;