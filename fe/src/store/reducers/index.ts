import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
import { tableReducer } from "../slices/tableSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  table: tableReducer,
});
