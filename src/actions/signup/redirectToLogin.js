import { push } from "react-router-redux";

export const redirectToLogin = () => {
    return dispatch => {
        dispatch(push('/login'));
    }
};