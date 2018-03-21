import * as S from 'actions/signup/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatPassword: '',
    isSignupInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case S.CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case S.CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case S.CHANGE_REPEAT_PASSWORD:
            return { ...state, repeatPassword: action.payload };
        case S.SET_SIGNUP_IN_PROGRESS:
            return { ...state, isSignupInProgress: action.payload };
        case S.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}