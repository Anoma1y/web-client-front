import {
    SIGNUP_CHANGE_EMAIL,
    SIGNUP_CHANGE_PASSWORD,
    SIGNUP_CHANGE_REPEAT_PASSWORD,
    SIGNUP_SET_SIGNUP_IN_PROGRESS,
    SIGNUP_SET_ERROR
} from 'actions/signup/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatPassword: '',
    isASignupInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case SIGNUP_CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case SIGNUP_CHANGE_REPEAT_PASSWORD:
            return { ...state, repeatPassword: action.payload };
        case SIGNUP_SET_SIGNUP_IN_PROGRESS:
            return { ...state, isASignupInProgress: action.payload };
        case SIGNUP_SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}