import type { Artwork } from "../../types/types";
import { TABLE_DATA_REQUEST, TABLE_DATA_SUCCESS, TABLE_DATA_FAIL,} from "../constant/tableConstants";

interface TableState {
  loading: boolean;
  artworks?: Artwork[];
  error?: string;
}

type TableAction = {
  type: string;
  payload?: Artwork[] | string;
};

const initialTableState: TableState = {
  loading: false,
  artworks: [],
};

export const tableDataReducer = ( state = initialTableState, action: TableAction ) : TableState => {
  switch (action.type) {
    case TABLE_DATA_REQUEST:
      return { ...state, loading: true, error: undefined };

    case TABLE_DATA_SUCCESS:
      return { loading: false, artworks: action.payload as Artwork[] };

    case TABLE_DATA_FAIL:
      return { loading: false, error: action.payload as string };

    default:
      return state;
  }
};