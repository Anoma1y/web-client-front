import { setError } from './setError';
import { setSignupInProgress } from './setSignupInProgress';
import SignUp from 'libs/ApiLib/SignUp';
import { push } from "react-router-redux";

export const handleRegistration = () => {
    return (dispatch, getState) => {
        const {
            email,
            password
        } = getState().signup;
        dispatch(setSignupInProgress(true));
        SignUp.regUser(email, password).then(() => {
            dispatch(setError(null));
            dispatch(setSignupInProgress(false));
            dispatch(push('/signupsuccess'));
        }).catch((err) => {
            dispatch(setSignupInProgress(false));
            dispatch(setError(err));
        })
    }
};
