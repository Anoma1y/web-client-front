import { setError } from './setError'
import ApiLib from 'libs/ApiLib/SignUp'
import { push } from "react-router-redux";
import { setResetInProgress } from "./setResetInProgress";

export const handleResetNewPassword = value => {
    return dispatch => {
        dispatch(setResetInProgress(true));
        ApiLib.setNewPassword(value).then((data) => {
            dispatch(setError(null));
            dispatch(setResetInProgress(false));
            console.log(data);
            // dispatch(push('/dashboard/'));
        }).catch((err) =>{
            dispatch(setResetInProgress(false));
            dispatch(setError("Email not found"));
        })
    }
};
