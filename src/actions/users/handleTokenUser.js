import { putToken } from './putToken';

export const handleTokenUser = value => {
    return dispatch => {
        dispatch(putToken(value));
        localStorage.setItem("jwt", value);
    }
};

