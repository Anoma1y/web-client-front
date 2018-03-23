import { setError } from './setError'
import ApiLib from 'libs/ApiLib/SignUp'
import { push } from "react-router-redux";
import { setResetInProgress } from "./setResetInProgress";
import { RESET_USER } from 'libs/messages';

export const handleResetNewPassword = value => {
    return dispatch => {
        dispatch(setResetInProgress(true));
        ApiLib.setNewPassword(value).then(() => {
            dispatch(setError(null));
            dispatch(setResetInProgress(false));
            dispatch(push('/login'));
        }).catch(() =>{
            dispatch(setResetInProgress(false));
            dispatch(setError(RESET_USER.TOKEN));
        })
    }
};
