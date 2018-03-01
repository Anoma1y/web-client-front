import { push } from "react-router-redux";

export const redirectToSignup = () => {
    return dispatch => {
        dispatch(push('/signup'));
    }
};