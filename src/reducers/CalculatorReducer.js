import * as C from 'actions/calculator/types';

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
    suffixText: {
        suffixToken: true,
        suffixCurrency: true
    },
    transferData: {
        USD: 0, TSR: 0, BTC: 0, ETH: 0
    },
    comments: '',
    order: {
        fixCurrency: "TSR",
        forCurrency: "",
        amount: 0
    },
    currency: [
        {
            'id': 'bitcoin',
            'name': 'Bitcoin',
            'symbol': 'BTC',
            'price_usd': '11007.3'
        },
        {
            'id': 'ethereum',
            'name': 'Ethereum',
            'symbol': 'ETH',
            "price_usd": "863.664",
            "price_btc": "0.0787655"
        },
        {
            'id': 'usd',
            'name': 'USD',
            'symbol': 'USD',
            'price_usd': '1'
        }
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case C.INITIALIZING_TKN:
            return { ...state, TSR: action.payload };
        case C.CHANGE_CURRENT_CURRENCY:
            return { ...state, currencyValue: action.payload };
        case C.CHANGE_SUM_VALUE:
            return { ...state, sumValue: action.payload };
        case C.CHANGE_TRANSFER_DATA:
            const { sumValue, progressBar, tokenValue, bonus, currentBonus ,transferData } = action.payload;
            return { ...state,  sumValue, progressBar, tokenValue, bonus, currentBonus, transferData };
        case C.CHECK_SUFFIX_TEXT:
            return { ...state, suffixText: action.payload };
        case C.CHANGE_COMMENTS:
            return { ...state, comments: action.payload };
        case C.CHANGE_MODAL_SUCCESSFUL:
            return { ...state, modalSuccessful: action.payload };
        case C.CHANGE_QUERY_SUCCESSFUL:
            return { ...state, querySuccess: action.payload };
        case C.CHANGE_CURRENT_BONUS:
            return { ...state, currentBonus: action.payload };
        case C.CHANGE_ORDER:
            return { ...state, order: action.payload };
        case C.CHANGE_MODAL_OPEN:
            return { ...state, modalOpen: action.payload };
        default:
            return state;
    }
}