import { setError } from './setError'
import { setSignupInProgress } from './setSignupInProgress'
import ApiLib from 'libs/ApiLib/SignUp'
import { push } from "react-router-redux";
import { Redirect } from 'react-router'

export const handleRegistration = value => {
    return dispatch => {
        const { email, password } = value;
        dispatch(setSignupInProgress(true));
        ApiLib.regUser(email, password).then(() => {
            dispatch(setError(null));
            setTimeout(() => {
                dispatch(setSignupInProgress(false));
            },1800)
            // dispatch(() => push('/signupsuccess'));
        }).catch((err) =>{
            dispatch(setError(err));
        })
    }
};
