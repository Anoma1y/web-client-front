import {
    PUT_TOKEN_USER
} from 'actions/users/types'
const INITIAL_STATE = {
    jwt: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PUT_TOKEN_USER:
            return { ...state, jwt: action.payload };
        default:
            return state;
    }
};