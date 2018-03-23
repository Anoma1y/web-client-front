import { setError } from './setError'
import ApiLib from 'libs/ApiLib/SignUp'
import { push } from "react-router-redux";
import { setResetInProgress } from "./setResetInProgress";
import { RESET_USER } from 'libs/messages';

export const handleReset = () => {
    return (dispatch, getState) => {
        dispatch(setResetInProgress(true));
        const {
            email
        } = getState().reset;
        ApiLib.resetPassword(email).then(() => {
            dispatch(setError(null));
            dispatch(setResetInProgress(false));
            dispatch(push('/reset/confirmation'));
        }).catch(() =>{
            dispatch(setResetInProgress(false));
            dispatch(setError(RESET_USER.EMAIL_NOT_FOUND));
        })
    }
};
