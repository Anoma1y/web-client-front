import {
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    SET_AUTH_IN_PROGRESS,
    SET_ERROR
} from 'actions/login/types'

const INITIAL_STATE = {
    email: 'ddd@mail.ru',
    password: '12345',
    isAuthInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case SET_AUTH_IN_PROGRESS:
            return { ...state, isAuthInProgress: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}