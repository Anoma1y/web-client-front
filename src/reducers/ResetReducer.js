import * as R from 'actions/reset/types'

const INITIAL_STATE = {
    email: '',
    newPassword: '',
    repeatNewPassword: '',
    isResetInProgress: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case R.CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case R.CHANGE_NEW_PASSWORD:
            return { ...state, newPassword: action.payload };
        case R.CHANGE_REPEAT_NEW_PASSWORD:
            return { ...state, repeatNewPassword: action.payload };
        case R.SET_RESET_IN_PROGRESS:
            return { ...state, isResetInProgress: action.payload };
        case R.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}