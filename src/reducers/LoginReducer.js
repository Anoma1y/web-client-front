import * as L from 'actions/login/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    isAuthInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case L.CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case L.CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case L.SET_AUTH_IN_PROGRESS:
            return { ...state, isAuthInProgress: action.payload };
        case L.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}