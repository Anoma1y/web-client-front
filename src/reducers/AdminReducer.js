import * as C from 'actions/admin/types';

const INITIAL_STATE = {
    usersList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    deleteUsers: [],
    deleteApplications: [],
    userRole: null,
    applicationStatus: null,
    applicationList: {
        data: [],
        column: null,
        direction: 'descending'
    },
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
    transferData: {
        USD: 0,
        TSR: 0,
        BTC: 0,
        ETH: 0
    },
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
        case C.ADD_USERS:
            return { ...state, usersList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case C.ADD_APPLICATION:
            return { ...state, applicationList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case C.SORTED_USERS:
            return { ...state, usersList: action.payload };
        case C.SORTED_APPLICATIONS:
            return { ...state, applicationList: action.payload };
        case C.CHANGE_DELETE_USERS:
            return { ...state, deleteUsers: action.payload };
        case C.CHANGE_DELETE_APPLICATIONS:
            return { ...state, deleteApplications: action.payload };
        case C.CHANGE_USER_ROLE:
            return { ...state, userRole: action.payload };
        case C.CHANGE_APPLICATION_STATUS:
            return { ...state, applicationStatus: action.payload };
        case C.SET_ADMIN_CURRENCY:
            return { ...state, currency: action.payload };
        case C.SET_ADMIN_CURRENTCURRENCY:
            return { ...state, currencyValue: action.payload };
        case C.SET_ADMIN_CURRENCY_VALUE:
            return { ...state, sumValue: action.payload };
        case C.SET_ADMIN_TOKEN_VALUE:
            return { ...state, tokenValue: action.payload };
        case C.SET_ADMIN_CURRENT_BONUS:
            return { ...state, currentBonus: action.payload };
        case C.SET_ADMIN_TRANSFER_DATA:
            const {
                sumValue,
                progressBar,
                tokenValue,
                bonus,
                currentBonus,
                transferData
            } = action.payload;
            return { ...state,  sumValue, progressBar, tokenValue, bonus, currentBonus, transferData };
        default:
            return state;
    }
}