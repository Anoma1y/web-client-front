import { setError } from './setError'
// import { setSignupInProgress } from './setSignupInProgress'
import ApiLib from 'libs/ApiLib/Login'
import { push } from "react-router-redux";
import { Redirect } from 'react-router';
import {setAuthInProgress} from "./setAuthInProgress";
import {putToken} from 'actions/users/putToken'

export const handleLogin = value => {
    return dispatch => {
        const { email, password } = value;
        dispatch(setAuthInProgress(true));
            ApiLib.logUser(email, password).then((data) => {
                dispatch(setError(null));
                dispatch(putToken(data.data.jwt))
                dispatch(setAuthInProgress(false));
                dispatch(push('/dashboard'));
            }).catch((err) =>{
                dispatch(setAuthInProgress(false));
                dispatch(setError(err));
            })
    }
};
