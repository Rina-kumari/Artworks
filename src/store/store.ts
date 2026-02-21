import { configureStore } from "@reduxjs/toolkit";  
import { tableDataReducer } from "./reducers/tableReducers";
import { paginatorReducer } from "./reducers/paginatorReducer";

const store = configureStore({
  reducer: {
    table: tableDataReducer,
    paginator: paginatorReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;