import * as B from 'actions/betatest/types';

const INITIAL_STATE = {
    androidChecked: false,
    appleChecked: false,
    success: false,
    betaModalIsOpen: false,
    betaTestError: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case B.CHECKED_ANDROID:
            return { ...state, androidChecked: action.payload };
        case B.CHECKED_APPLE:
            return { ...state, appleChecked: action.payload };
        case B.SUCCESS_APPLICATION:
            return { ...state, success: action.payload };
        case B.CHANGE_MODAL_BETA:
            return { ...state, betaModalIsOpen: action.payload };
        case B.CHANGE_BETATEST_ERROR:
            return { ...state, betaTestError: action.payload };
        default:
            return state;
    }
};