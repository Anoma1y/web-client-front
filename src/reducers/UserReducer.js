import {
    PUT_TOKEN_USER,
    DELETE_TOKEN_USER
} from 'actions/users/types'
const INITIAL_STATE = {
    jwt: null,
    userEmail: "ddd@mail.ru"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PUT_TOKEN_USER:
            return { ...state, jwt: action.payload };
        case DELETE_TOKEN_USER:
            return { ...state, jwt: null };
        default:
            return state;
    }
};