import {
  GROCERIES_UPDATE_REQUEST,
  GROCERIES_UPDATE_SUCCESS,
  GROCERIES_UPDATE_FAIL,
  GROCERIES_CREATE_FAIL,
  GROCERIES_CREATE_REQUEST,
  GROCERIES_CREATE_SUCCESS,
  GROCERIES_DELETE_FAIL,
  GROCERIES_DELETE_REQUEST,
  GROCERIES_DELETE_SUCCESS,
  GROCERIES_LIST_FAIL,
  GROCERIES_LIST_REQUEST,
  GROCERIES_LIST_SUCCESS,
} from "../constants/groceriesConstants";

export const groceryListReducer = (state = { groceries: [] }, action) => {
  switch (action.type) {
    case GROCERIES_LIST_REQUEST:
      return { loading: true };
    case GROCERIES_LIST_SUCCESS:
      return { loading: false, groceries: action.payload };
    case GROCERIES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const groceryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERIES_CREATE_REQUEST:
      return { loading: true };
    case GROCERIES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case GROCERIES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const groceryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERIES_DELETE_REQUEST:
      return { loading: true };
    case GROCERIES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GROCERIES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const groceryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERIES_UPDATE_REQUEST:
      return { loading: true };
    case GROCERIES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case GROCERIES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
