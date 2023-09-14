import {
    SHOPSS_UPDATE_REQUEST,
    SHOPSS_UPDATE_SUCCESS,
    SHOPSS_UPDATE_FAIL,
    SHOPSS_CREATE_FAIL,
    SHOPSS_CREATE_REQUEST,
    SHOPSS_CREATE_SUCCESS,
    SHOPSS_DELETE_FAIL,
    SHOPSS_DELETE_REQUEST,
    SHOPSS_DELETE_SUCCESS,
    SHOPSS_LIST_FAIL,
    SHOPSS_LIST_REQUEST,
    SHOPSS_LIST_SUCCESS,
  } from "../constants/shopsConstants";
  
  export const shopListReducer = (state = { shops: [] }, action) => {
    switch (action.type) {
      case SHOPSS_LIST_REQUEST:
        return { loading: true };
      case SHOPSS_LIST_SUCCESS:
        return { loading: false, shops: action.payload };
      case SHOPSS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const shopCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SHOPSS_CREATE_REQUEST:
        return { loading: true };
      case SHOPSS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case SHOPSS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const shopDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SHOPSS_DELETE_REQUEST:
        return { loading: true };
      case SHOPSS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SHOPSS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const shopUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case SHOPSS_UPDATE_REQUEST:
        return { loading: true };
      case SHOPSS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case SHOPSS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  