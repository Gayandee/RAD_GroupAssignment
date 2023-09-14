import {
    DIARY_LIST_REQUEST,
    DIARY_LIST_SUCCESS,
    DIARY_LIST_FAIL,
    DIARY_CREATE_REQUEST,
    DIARY_CREATE_SUCCESS,
    DIARY_CREATE_FAIL,
    DIARY_UPDATE_REQUEST,
    DIARY_UPDATE_SUCCESS,
    DIARY_UPDATE_FAIL,
    DIARY_DELETE_REQUEST,
    DIARY_DELETE_SUCCESS,
    DIARY_DELETE_FAIL,
} from "../constants/diaryConstants";

export const diaryListReducer = (state = { diaries: [] }, action) => {
    switch (action.type) {
        case DIARY_LIST_REQUEST:
            return { loading: true };
        case DIARY_LIST_SUCCESS:
            return { loading: false, diaries: action.payload };
        case DIARY_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const diaryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DIARY_CREATE_REQUEST:
            return { loading: true };
        case DIARY_CREATE_SUCCESS:
            return { loading: false, success: true };
        case DIARY_CREATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const diaryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DIARY_DELETE_REQUEST:
            return { loading: true };
        case DIARY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case DIARY_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
};

export const diaryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case DIARY_UPDATE_REQUEST:
            return { loading: true };
        case DIARY_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case DIARY_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
};
