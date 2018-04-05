import * as U from 'actions/users/types';

const INITIAL_STATE = {
    ID: null,
    jwt: null,
    email: '',
    isIdentification: false,
    kyc_type: '',
    roles: "user",
    is_blocked: false,
    balance: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case U.INIT_ID:
            return { ...state, ID: action.payload };
        case U.PUT_TOKEN_USER:
            return { ...state, jwt: action.payload };
        case U.PUT_ROLES_USER:
            return { ...state, roles: action.payload };
        case U.INIT_EMAIL:
            return { ...state, email: action.payload };
        case U.INIT_IDENFIFIED:
            return { ...state, isIdentification: action.payload };
        case U.INIT_KYC_TYPE:
            return { ...state, kyc_type: action.payload };
        case U.INIT_IS_BLOCKED:
            return { ...state, is_blocked: action.payload };
        case U.INIT_BALANCE:
            return { ...state, balance: action.payload };
        default:
            return state;
    }
};