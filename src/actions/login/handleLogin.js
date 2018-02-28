import { setError } from './setError'
import Login from 'libs/ApiLib/Login'
import { push } from "react-router-redux";
import { setAuthInProgress } from "./setAuthInProgress";
import { handleTokenUser } from 'actions/users/handleTokenUser';
import {
    initIdenfified,
    initEmail
} from 'actions/users';

export const handleLogin = value => {
    return dispatch => {
        const { email, password } = value;
        dispatch(setAuthInProgress(true));
        Login.logUser(email, password).then((data) => {
            dispatch(setError(null));
            Login.getUser(data.data.jwt).then((user) => {
                const {
                    is_kyc_passed,
                    email
                } = user.data;
                dispatch(initIdenfified(is_kyc_passed));
                dispatch(initEmail(email));
            })
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
