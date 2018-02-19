import {
    GET_CURRENCY
} from 'actions/test/types';

const INITIAL_STATE = {
    currency: {

    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENCY:
            return state;
        default:
            return state;
    }
};