import {
    SHOPSS_CREATE_FAIL,
    SHOPSS_CREATE_REQUEST,
    SHOPSS_CREATE_SUCCESS,
    SHOPSS_DELETE_FAIL,
    SHOPSS_DELETE_REQUEST,
    SHOPSS_DELETE_SUCCESS,
    SHOPSS_LIST_FAIL,
    SHOPSS_LIST_REQUEST,
    SHOPSS_LIST_SUCCESS,
    SHOPSS_UPDATE_FAIL,
    SHOPSS_UPDATE_REQUEST,
    SHOPSS_UPDATE_SUCCESS,
  } from "../constants/shopsConstants";
  import axios from "axios";
  
  export const listShops = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOPSS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/shops`, config);
  
      dispatch({
        type: SHOPSS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SHOPSS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createShopAction = (name, address, email, mobile) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: SHOPSS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/shops/create`,
        { name, address, email, mobile },
        config
      );
  
      dispatch({
        type: SHOPSS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SHOPSS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteShopAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOPSS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/shops/${id}`, config);
  
      dispatch({
        type: SHOPSS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SHOPSS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateShopAction = (id, name, address, email, mobile) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: SHOPSS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/shops/${id}`,
        { name, address, email, mobile },
        config
      );
  
      dispatch({
        type: SHOPSS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SHOPSS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  