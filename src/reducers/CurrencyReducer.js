import { CHANGE_RATE_CURRENCY } from 'actions/rate/types';

const INITIAL_STATE = {
    TSR: 0.001,
    currency: [
        {
            'id': 'bitcoin',
            'name': 'Bitcoin',
            'symbol': 'BTC',
            'price_usd': '0'
        },
        {
            'id': 'ethereum',
            'name': 'Ethereum',
            'symbol': 'ETH',
            "price_usd": "0",
            "price_btc": "0"
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
        case CHANGE_RATE_CURRENCY:
            return { ...state, currency: action.payload };
        default:
            return state;
    }
}