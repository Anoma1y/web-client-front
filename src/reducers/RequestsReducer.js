import { ADD_REQUEST_ITEM } from 'actions/request/types';

const INITIAL_STATE = {
    items: [
        // { amount: 12453, sum: 3, currency: 'BTC', status: 1},
        // { amount: 10321, sum: 1200, currency: 'USD', status: 2},
        // { amount: 7001, sum: 10, currency: 'ETH', status: 0},
        // { amount: 12453, sum: 3, currency: 'BTC', status: 1},
        // { amount: 10321, sum: 1200, currency: 'USD', status: 2},
        // { amount: 7001, sum: 10, currency: 'ETH', status: 0},
        // { amount: 12453, sum: 3, currency: 'BTC', status: 1},
    ],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_REQUEST_ITEM:
            return { ...state, items: action.payload};
        default:
            return state
    }
}