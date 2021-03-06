import * as R from 'actions/request/types';

const INITIAL_STATE = {
    items: [],
    bonus: [{value: 2.5,limit: 100000,active: false},{value: 5,limit: 500000,active: false},{value: 10,limit: 1000000,active: false},{value: 15,limit: 2000000,active: false}],
    payment: {
        ADDRESS: '1',
        EXPECTED_VALUE: 0
    },
    paymentIsLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case R.ADD_REQUEST_ITEM:
            return { ...state, items: action.payload};
        case R.INITIAL_PAY_INFO:
            return {
                ...state,
                payment: {
                    ADDRESS: action.payload.address,
                    EXPECTED_VALUE: action.payload.expected_balance
                }
            };
        case R.PAYMENT_INFO_IS_LOADING:
            return { ...state, paymentIsLoading: action.payload };
        default:
            return state
    }
}