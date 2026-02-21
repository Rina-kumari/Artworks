import { SET_PAGE, SET_ROWS } from "../constant/paginatorConstants";
import type { AppDispatch } from "../store";

export const setPage = (offset: number) => (dispatch: AppDispatch) => {
  dispatch({ type: SET_PAGE, payload: offset });
};

export const setRows = (rows: number) => (dispatch: AppDispatch) => {
  dispatch({ type: SET_ROWS, payload: rows });
};