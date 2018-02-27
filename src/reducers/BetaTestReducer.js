import {
    CHECKED_ANDROID,
    CHECKED_APPLE
} from 'actions/betatest/types';

const INITIAL_STATE = {
    androidChecked: false,
    appleChecked: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECKED_ANDROID:
            return { ...state, androidChecked: action.payload };
        case CHECKED_APPLE:
            return { ...state, appleChecked: action.payload };
        default:
            return state;
    }
};