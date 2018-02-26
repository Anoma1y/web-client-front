import { setError } from './setError'
import ApiLib from 'libs/ApiLib/SignUp'
import { push } from "react-router-redux";
import { setResetInProgress } from "./setResetInProgress";

export const handleReset = email => {
    return dispatch => {
        dispatch(setResetInProgress(true));
        ApiLib.resetPassword(email).then((data) => {
            dispatch(setError(null));
            dispatch(setResetInProgress(false));
            // dispatch(push('/dashboard/'));
        }).catch((err) =>{
            dispatch(setResetInProgress(false));
            dispatch(setError("Email not found"));
        })
    }
};
