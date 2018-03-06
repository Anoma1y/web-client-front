import {
    PUT_TOKEN_USER,
    DELETE_TOKEN_USER,
    INIT_EMAIL,
    INIT_IDENFIFIED,
    PUT_ROLES_USER
} from 'actions/users/types';

const INITIAL_STATE = {
    jwt: null,
    email: "",
    isIdentification: true,
    roles: "user"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};