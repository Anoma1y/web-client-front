import {
    CHANGE_EMAIL,
    CHANGE_NEW_PASSWORD,
    CHANGE_REPEAT_NEW_PASSWORD,
    SET_RESET_IN_PROGRESS,
    SET_ERROR
} from 'actions/reset/types'

const INITIAL_STATE = {
    email: '',
    newPassword: '',
    repeatNewPassword: '',
    isResetInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_NEW_PASSWORD:
            return { ...state, newPassword: action.payload };
        case CHANGE_REPEAT_NEW_PASSWORD:
            return { ...state, repeatNewPassword: action.payload };
        case SET_RESET_IN_PROGRESS:
            return { ...state, isResetInProgress: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}