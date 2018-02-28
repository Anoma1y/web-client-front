import Login from 'libs/ApiLib/Login'
import { push } from "react-router-redux";
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken
} from 'actions/users';
export const initialUser = token => {
    return dispatch => {
        Login.getUser(token).then((user) =>{
            const { email, is_kyc_passed} = user.data;
            dispatch(initIdenfified(is_kyc_passed));
            dispatch(initEmail(email));
            dispatch(putToken(token));
        }).catch(() => {
            dispatch(deleteToken());
            dispatch(push('/login'));
        })
    }
};
