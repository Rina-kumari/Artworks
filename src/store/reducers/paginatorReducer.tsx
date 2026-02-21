import { SET_PAGE, SET_ROWS, SET_PAGINATION_INFO } from "../constant/paginatorConstants";

interface PaginatorState {
  currentPage_offset: number;
  rows_per_page_limit: number;
  total_artworks: number;        
  total_Pages: number;  
  current_Page: number;  
}

type PaginatorAction = {
  type: string;
  payload?: number | { apiTotal: number; apiTotalPages: number; apiCurrentPage: number };
};

const initialPaginatorState: PaginatorState = {
  currentPage_offset: 0,
  rows_per_page_limit: 12,
  total_artworks: 0,
  total_Pages: 0,
  current_Page: 1,
};

export const paginatorReducer = (
  state = initialPaginatorState,
  action: PaginatorAction
): PaginatorState => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage_offset: action.payload as number };
    case SET_ROWS:
      return { ...state, rows_per_page_limit: action.payload as number };
    case SET_PAGINATION_INFO: {                          
      const payload = action.payload as { apiTotal: number; apiTotalPages: number; apiCurrentPage: number };
      return { ...state, total_artworks: payload.apiTotal, total_Pages: payload.apiTotalPages, current_Page: payload.apiCurrentPage };
    }
    default:
      return state;
  }
};