import {
    CHANGE_CURRENT_CURRENCY,
    CHANGE_SUM_VALUE,
    CHANGE_TRANSFER_DATA,
    CHECK_SUFFIX_TEXT,
    CHANGE_COMMENTS,
    CHANGE_MODAL_SUCCESSFUL,
    CHANGE_QUERY_SUCCESSFUL,
    CHANGE_CURRENT_BONUS,
    CHANGE_ORDER,
    CHANGE_MODAL_OPEN,
    CHANGE_APPLICATION_ERROR,
} from 'actions/calculator/types';

const INITIAL_STATE = {
    TSR: 0.001,
    bonus: [
        {
            value: 2.5,
            limit: 100000,
            active: false
        },{
            value: 5,
            limit: 500000,
            active: false
        },{
            value: 10,
            limit: 1000000,
            active: false
        },{
            value: 15,
            limit: 2000000,
            active: false
        }
    ],
    currentBonus: 0,
    progressBar: {
        percent: 0,
        isMaximum: false
    },
    currencyValue: 'ETH',
    sumValue: 0,
    tokenValue: 10000,
    modalOpen: false,
    modalSuccessful: false,
    querySuccess: null,
    applicationError: null,
    suffixText: {
        suffixToken: true,
        suffixCurrency: true
    },
    transferData: {
        USD: 0,
        TSR: 0,
        BTC: 0,
        ETH: 0
    },
    comments: '',
    order: {
        fixCurrency: "TSR",
        forCurrency: "",
        amount: 0
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_CURRENCY:
            return { ...state, currencyValue: action.payload };
        case CHANGE_SUM_VALUE:
            return { ...state, sumValue: action.payload };
        case CHANGE_TRANSFER_DATA:
            const {
                sumValue,
                progressBar,
                tokenValue,
                bonus,
                currentBonus,
                transferData
            } = action.payload;
            return { ...state,  sumValue, progressBar, tokenValue, bonus, currentBonus, transferData };
        case CHECK_SUFFIX_TEXT:
            return { ...state, suffixText: action.payload };
        case CHANGE_COMMENTS:
            return { ...state, comments: action.payload };
        case CHANGE_MODAL_SUCCESSFUL:
            return { ...state, modalSuccessful: action.payload };
        case CHANGE_QUERY_SUCCESSFUL:
            return { ...state, querySuccess: action.payload };
        case CHANGE_CURRENT_BONUS:
            return { ...state, currentBonus: action.payload };
        case CHANGE_ORDER:
            return { ...state, order: action.payload };
        case CHANGE_MODAL_OPEN:
            return { ...state, modalOpen: action.payload };
        case CHANGE_APPLICATION_ERROR:
            return { ...state, applicationError: action.payload };
        default:
            return state;
    }
}
