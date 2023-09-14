import {
  GROCERIES_CREATE_FAIL,
  GROCERIES_CREATE_REQUEST,
  GROCERIES_CREATE_SUCCESS,
  GROCERIES_DELETE_FAIL,
  GROCERIES_DELETE_REQUEST,
  GROCERIES_DELETE_SUCCESS,
  GROCERIES_LIST_FAIL,
  GROCERIES_LIST_REQUEST,
  GROCERIES_LIST_SUCCESS,
  GROCERIES_UPDATE_FAIL,
  GROCERIES_UPDATE_REQUEST,
  GROCERIES_UPDATE_SUCCESS,
} from "../constants/groceriesConstants";
import axios from "axios";

export const listGroceries = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROCERIES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/groceries`, config);

    dispatch({
      type: GROCERIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GROCERIES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createGroceryAction = (Heading, Description, PriorityLevel) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GROCERIES_CREATE_REQUEST,
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
      `/api/groceries/create`,
      { Heading, Description, PriorityLevel },
      config
    );

    dispatch({
      type: GROCERIES_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GROCERIES_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteGroceryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROCERIES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/groceries/${id}`, config);

    dispatch({
      type: GROCERIES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GROCERIES_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateGroceryAction = (id, Heading, Description, PriorityLevel) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GROCERIES_UPDATE_REQUEST,
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
      `/api/groceries/${id}`,
      { Heading, Description, PriorityLevel },
      config
    );

    dispatch({
      type: GROCERIES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GROCERIES_UPDATE_FAIL,
      payload: message,
    });
  }
};


