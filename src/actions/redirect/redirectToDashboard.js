import { push } from "react-router-redux";

export const redirectToDashboard = () => {
    return dispatch => {
        dispatch(push('/dashboard'));
    }
};