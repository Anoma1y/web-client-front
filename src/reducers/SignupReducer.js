import {
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_REPEAT_PASSWORD,
    SET_SIGNUP_IN_PROGRESS,
    SET_ERROR
} from 'actions/signup/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatPassword: '',
    isSignupInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case CHANGE_REPEAT_PASSWORD:
            return { ...state, repeatPassword: action.payload };
        case SET_SIGNUP_IN_PROGRESS:
            return { ...state, isSignupInProgress: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}