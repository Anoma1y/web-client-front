import {
    CHECKED_ANDROID,
    CHECKED_APPLE,
    SUCCESS_APPLICATION
} from 'actions/betatest/types';

const INITIAL_STATE = {
    androidChecked: false,
    appleChecked: false,
    success: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECKED_ANDROID:
            return { ...state, androidChecked: action.payload };
        case CHECKED_APPLE:
            return { ...state, appleChecked: action.payload };
        case SUCCESS_APPLICATION:
            return { ...state, success: action.payload };
        default:
            return state;
    }
};