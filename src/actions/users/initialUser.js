import Login from 'libs/ApiLib/Login'
import { push } from "react-router-redux";
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken
} from 'actions/users';
import { redirectToSignup } from 'actions/redirect';
export const initialUser = token => {
    return dispatch => {
        Login.getUser(token).then((user) =>{
            const { email, is_kyc_passed} = user.data;
            //TODO добавить проверку роли и если "Админ" - запрерить перенаправление на дашборд
            // dispatch(initIdenfified(is_kyc_passed));
            dispatch(initEmail(email));
            dispatch(putToken(token));
            // dispatch(push('/dashboard/'));
        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem("jwt");
            dispatch(redirectToSignup());
        })
    }
};
