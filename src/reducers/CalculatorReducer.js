import * as C from 'actions/calculator/types';

const INITIAL_STATE = {
    TKN: 1,
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
    progressBar: {
        percent: 0,
        isMaximum: false
    },
    currencyValue: "USD",
    sumValue: 0,
    tokenValue: 10000,
    suffixText: {
        suffixToken: true,
        suffixCurrency: true
    },
    transferData: {
        USD: 0, TKN: 0, BTC: 0, ETH: 0
    },
    currency: [
        {
            "id": "bitcoin",
            "name": "Bitcoin",
            "symbol": "BTC",
            "price_usd": "8631.11"
        },
        {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "price_usd": "845.463",
            "price_btc": "0.0986706"
        },
        {
            "id": "usd",
            "name": "USD",
            "symbol": "USD",
            "price_usd": "1"
        }
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case C.CHANGE_CURRENT_CURRENCY:
            return {...state, currencyValue: action.payload};
        case C.CHANGE_SUM_VALUE:
            return {...state, sumValue: action.payload};
        case C.CHANGE_TRANSFER_DATA:
            const { sumValue, progressBar, tokenValue, bonus, transferData } = action.payload;
            return {...state,  sumValue, progressBar, tokenValue, bonus, transferData};
        case C.CHECK_APPEND_TEXT:
            return {...state};
        default:
            return state;
    }
}