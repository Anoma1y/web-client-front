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
const CHANGE_CURRENT_CURRENCY = "calculator/CHANGE_CURRENT_CURRENCY";
const CHANGE_SUM_VALUE = "calculator/CHANGE_SUM_VALUE";
const CHANGE_PROGRESS_BAR = "calculator/CHANGE_PROGRESS_BAR";
const CHANGE_TOKEN_VALUE = "calculator/CHANGE_TOKEN_VALUE";
const CHANGE_BONUS = "calculator/CHANGE_BONUS";
const CHANGE_TRANSFER_DATA = "calculator/CHANGE_TRANSFER_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_CURRENCY:
            return {...state, currencyValue: action.payload};
        case CHANGE_SUM_VALUE:
            return {...state, sumValue: action.payload};
        case CHANGE_PROGRESS_BAR:
            return {...state, progressBar: action.payload};
        case CHANGE_TOKEN_VALUE:
            return {...state, tokenValue: action.payload};
        case CHANGE_BONUS:
            return {...state, bonus: action.payload};
        case CHANGE_TRANSFER_DATA:
            return {...state, transferData: action.payload};
        default:
            return state;
    }
}