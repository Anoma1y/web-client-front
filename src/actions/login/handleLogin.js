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
                const JWT = data.data.jwt;
                dispatch(handleTokenUser(JWT));
                dispatch(setAuthInProgress(false));
                dispatch(push('/dashboard/'));
            }).catch((err) =>{
                dispatch(setAuthInProgress(false));
                dispatch(setError(err));
            })
    }
};
