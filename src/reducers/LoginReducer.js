import {
    LOGIN_CHANGE_EMAIL,
    LOGIN_CHANGE_PASSWORD,
    LOGIN_SET_AUTH_IN_PROGRESS,
    LOGIN_SET_ERROR
} from 'actions/login/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    isAuthInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case LOGIN_CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case LOGIN_SET_AUTH_IN_PROGRESS:
            return { ...state, isAuthInProgress: action.payload };
        case LOGIN_SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}