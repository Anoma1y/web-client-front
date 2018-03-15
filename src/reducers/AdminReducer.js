import {
    ADD_USERS,
    ADD_APPLICATION,
    SORTED_USERS,
    SORTED_APPLICATIONS,
    CHANGE_DELETE_USERS,
    CHANGE_DELETE_APPLICATIONS,
    CHANGE_USER_ROLE,
    CHANGE_APPLICATION_STATUS,
    SET_ADMIN_CURRENTCURRENCY,
    SET_ADMIN_CURRENCY_VALUE,
    SET_ADMIN_TOKEN_VALUE,
    SET_ADMIN_CURRENT_BONUS,
    SET_ADMIN_TRANSFER_DATA,
    SET_ADMIN_APPLICATION_SINGLE,
    CHANGE_FIXED_CURRENCY,
    SET_ADMIN_USER_SINGLE
} from 'actions/admin/types';

const INITIAL_STATE = {
    usersList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    applicationList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    singleApplication: {
        CreatedAt: null,
        ID: null,
        amount: 0,
        currency: '',
        comment: '',
        profile: {
            ID: null,
            CreatedAt: null,
            email: '',
            is_kyc_passed: null,
            is_verified: null,
            kyc_type: null,
            roles: ''
        },
        status: null
    },
    singleUser: {
        CreatedAt: null,
        ID: null,
        email: null,
        is_kyc_passed: null,
        is_verified: null,
        kyc_type: null,
        roles: null
    },
    deleteUsers: [],
    deleteApplications: [],
    userRole: null,
    applicationStatus: null,
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
    fixedCurrency: 'TSR/ETH',
    transferData: {
        USD: 0,
        TSR: 0,
        BTC: 0,
        ETH: 0
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USERS:
            return { ...state, usersList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case ADD_APPLICATION:
            return { ...state, applicationList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case SORTED_USERS:
            return { ...state, usersList: action.payload };
        case SORTED_APPLICATIONS:
            return { ...state, applicationList: action.payload };
        case CHANGE_DELETE_USERS:
            return { ...state, deleteUsers: action.payload };
        case CHANGE_DELETE_APPLICATIONS:
            return { ...state, deleteApplications: action.payload };
        case CHANGE_USER_ROLE:
            return { ...state, userRole: action.payload };
        case CHANGE_APPLICATION_STATUS:
            return { ...state, applicationStatus: action.payload };
        case CHANGE_FIXED_CURRENCY:
            return { ...state, fixedCurrency: action.payload };
        case SET_ADMIN_CURRENTCURRENCY:
            return { ...state, currencyValue: action.payload };
        case SET_ADMIN_CURRENCY_VALUE:
            return { ...state, sumValue: action.payload };
        case SET_ADMIN_TOKEN_VALUE:
            return { ...state, tokenValue: action.payload };
        case SET_ADMIN_CURRENT_BONUS:
            return { ...state, currentBonus: action.payload };
        case SET_ADMIN_TRANSFER_DATA:
            const {
                sumValue,
                progressBar,
                tokenValue,
                bonus,
                currentBonus,
                transferData
            } = action.payload;
            return { ...state,  sumValue, progressBar, tokenValue, bonus, currentBonus, transferData };
        case SET_ADMIN_APPLICATION_SINGLE:
            return { ...state, singleApplication: action.payload };
        case SET_ADMIN_USER_SINGLE:
            return { ...state, singleUser: action.payload };
        default:
            return state;
    }
}