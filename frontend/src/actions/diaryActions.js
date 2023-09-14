import {
    DIARY_CREATE_FAIL,
    DIARY_CREATE_REQUEST,
    DIARY_CREATE_SUCCESS,
    DIARY_DELETE_FAIL,
    DIARY_DELETE_REQUEST,
    DIARY_DELETE_SUCCESS,
    DIARY_LIST_FAIL,
    DIARY_LIST_REQUEST,
    DIARY_LIST_SUCCESS,
    DIARY_UPDATE_FAIL,
    DIARY_UPDATE_REQUEST,
    DIARY_UPDATE_SUCCESS,
} from "../constants/diaryConstants";
import axios from "axios";

export const listDiaries = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DIARY_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

    const { data } = await axios.get(`/api/diaries`, config);

    dispatch({
        type: DIARY_LIST_SUCCESS,
        payload: data,
    });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: DIARY_LIST_FAIL,
            payload: message,
        });
    }
};

export const createDiaryAction = (heading, diarybody) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: DIARY_CREATE_REQUEST,
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
            `/api/diaries/create`,
            { heading, diarybody },
            config
        );

        dispatch({
            type: DIARY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: DIARY_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deleteDiaryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DIARY_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/diaries/${id}`, config);

        dispatch({
            type: DIARY_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: DIARY_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updateDiaryAction = (id, heading, diarybody) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: DIARY_UPDATE_REQUEST,
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
            `/api/diaries/${id}`,
            { heading, diarybody },
            config
        );

        dispatch({
            type: DIARY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: DIARY_UPDATE_FAIL,
            payload: message,
        });
    }
}

