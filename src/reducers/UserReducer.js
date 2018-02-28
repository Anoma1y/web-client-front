import {
    PUT_TOKEN_USER,
    DELETE_TOKEN_USER,
    INIT_EMAIL,
    INIT_IDENFIFIED
} from 'actions/users/types';
const INITIAL_STATE = {
    jwt: null,
    email: "",
    isIdentification: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PUT_TOKEN_USER:
            return { ...state, jwt: action.payload };
        case DELETE_TOKEN_USER:
            return { ...state, jwt: null };
        case INIT_EMAIL:
            return { ...state, email: action.payload };
        case INIT_IDENFIFIED:
            return { ...state, isIdentification: action.payload };
        default:
            return state;
    }
};