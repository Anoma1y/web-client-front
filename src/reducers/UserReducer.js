import {
    PUT_TOKEN_USER,
    DELETE_TOKEN_USER,
    INIT_EMAIL,
    INIT_IDENFIFIED,
    PUT_ROLES_USER,
    INIT_KYC_TYPE,
    INIT_ID
} from 'actions/users/types';

const INITIAL_STATE = {
    ID: null,
    jwt: null,
    email: '',
    isIdentification: false,
    kyc_type: '',
    roles: "user"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_ID:
            return { ...state, ID: action.payload };
        case PUT_TOKEN_USER:
            return { ...state, jwt: action.payload };
        case DELETE_TOKEN_USER:
            return { ...state, jwt: null };
        case PUT_ROLES_USER:
            return { ...state, roles: action.payload };
        case INIT_EMAIL:
            return { ...state, email: action.payload };
        case INIT_IDENFIFIED:
            return { ...state, isIdentification: action.payload };
        case INIT_KYC_TYPE:
            return { ...state, kyc_type: action.payload };
        default:
            return state;
    }
};