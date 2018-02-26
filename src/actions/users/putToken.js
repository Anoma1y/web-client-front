import { PUT_TOKEN_USER } from './types';

export const putToken = value => {
    return dispatch => {
        dispatch({
            type: PUT_TOKEN_USER,
            payload: value
        });
        localStorage.setItem("jwt", value);
    }
};

