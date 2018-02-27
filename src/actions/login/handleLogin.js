import { setError } from './setError'
import ApiLib from 'libs/ApiLib/Login'
import { push } from "react-router-redux";
import { setAuthInProgress } from "./setAuthInProgress";
import { handleTokenUser } from 'actions/users/handleTokenUser'

export const handleLogin = value => {
    return dispatch => {
        const { email, password } = value;
        dispatch(setAuthInProgress(true));
        ApiLib.logUser(email, password).then((data) => {
            dispatch(setError(null));
            const { jwt } = data.data;
            dispatch(handleTokenUser(jwt));
            localStorage.setItem("jwt", jwt);
            dispatch(setAuthInProgress(false));
            dispatch(push('/dashboard/'));
        }).catch((err) =>{
            dispatch(setAuthInProgress(false));
            dispatch(setError(err));
        })
    }
};
