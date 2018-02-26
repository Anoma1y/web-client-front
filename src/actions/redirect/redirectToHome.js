import { push } from "react-router-redux";

export const redirectToHome = () => {
    return dispatch => {
        dispatch(push('/'));
    }
};