import {
    CHECKED_ANDROID,
    CHECKED_APPLE,
    SUCCESS_APPLICATION,
    CHANGE_MODAL_BETA
} from 'actions/betatest/types';

const INITIAL_STATE = {
    androidChecked: false,
    appleChecked: false,
    success: false,
    betaModalIsOpen: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECKED_ANDROID:
            return { ...state, androidChecked: action.payload };
        case CHECKED_APPLE:
            return { ...state, appleChecked: action.payload };
        case SUCCESS_APPLICATION:
            return { ...state, success: action.payload };
        case CHANGE_MODAL_BETA:
            return { ...state, betaModalIsOpen: action.payload };
        default:
            return state;
    }
};