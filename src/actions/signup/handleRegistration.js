import { setError } from './setError'
import { setSignupInProgress } from './setSignupInProgress'
import ApiLib from 'libs/ApiLib/SignUp'
import { push } from "react-router-redux";
import { Redirect } from 'react-router';


export const handleRegistration = value => {
    return dispatch => {
        const { email, password } = value;
        dispatch(setSignupInProgress(true));
        setTimeout(() => {
            ApiLib.regUser(email, password).then(() => {
                dispatch(setError(null));
                dispatch(setSignupInProgress(false));
                dispatch(push('/signupsuccess'));
            }).catch((err) =>{
                dispatch(setSignupInProgress(false));
                dispatch(setError(err));
            })
        }, 1000)
    }
};
