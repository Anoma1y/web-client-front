import { ADD_REQUEST_ITEM } from 'actions/request/types';

const INITIAL_STATE = {
    items: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_REQUEST_ITEM:
            return { ...state, items: action.payload};
        default:
            return state
    }
}