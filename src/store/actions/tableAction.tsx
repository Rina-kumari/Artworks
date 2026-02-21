import { TABLE_DATA_REQUEST, TABLE_DATA_SUCCESS, TABLE_DATA_FAIL } from "../constant/tableConstants";
import { SET_PAGINATION_INFO } from "../constant/paginatorConstants";
import type { ApiResponse, Artwork } from "../../types/types";
import type { AppDispatch } from "../store";

export const fetchArtworks = (page: number = 1) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: TABLE_DATA_REQUEST });

    const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
    const data: ApiResponse = await res.json();

    dispatch({ type: TABLE_DATA_SUCCESS, payload: data.data });

    dispatch({
      type: SET_PAGINATION_INFO,
      payload: {
        apiTotal: data.pagination.total,           
        apiTotalPages: data.pagination.total_pages,
        apiCurrentPage: data.pagination.current_page, 
      }
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    dispatch({ type: TABLE_DATA_FAIL, payload: message });
  }
};

export const fetchArtworksByCount = (count: number, onSuccess: (artworks: Artwork[]) => void) => async () => {
  try {
    const rowsPerPage = 12;
    const pagesNeeded = Math.ceil(count / rowsPerPage);
    const fetchedArtworks: Artwork[] = [];

    for (let page = 1; page <= pagesNeeded; page++) {
      const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
      const data: ApiResponse = await res.json();
      fetchedArtworks.push(...data.data);
    }

    onSuccess(fetchedArtworks.slice(0, count));

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    console.error(message);
  }
};