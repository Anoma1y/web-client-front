import {
    ADD_REQUEST_ITEM,
    INITIAL_PAY_INFO,
    PAYMENT_INFO_IS_LOADING,
    PAYMENT_MODAL_IS_OPEN
} from 'actions/request/types';

const INITIAL_STATE = {
    items: [],
    bonus: [{value: 2.5,limit: 100000,active: false},{value: 5,limit: 500000,active: false},{value: 10,limit: 1000000,active: false},{value: 15,limit: 2000000,active: false}],
    payment: {
        TYPE: '',
        ADDRESS: '',
        EXPECTED_VALUE: null
    },
    paymentModalIsOpen: false,
    paymentIsLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_REQUEST_ITEM:
            return { ...state, items: action.payload};
        case PAYMENT_MODAL_IS_OPEN:
            return { ...state, paymentModalIsOpen: action.payload };
        case INITIAL_PAY_INFO:
            return {
                ...state,
                payment: {
                    TYPE: action.payload.TYPE,
                    ADDRESS: action.payload.ADDRESS,
                    EXPECTED_VALUE: action.payload.EXPECTED_VALUE
                }
            };
        case PAYMENT_INFO_IS_LOADING:
            return { ...state, paymentIsLoading: action.payload };
        default:
            return state
    }
}