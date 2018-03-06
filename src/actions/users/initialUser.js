import Login from 'libs/ApiLib/Login'
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken,
    putRoles
} from 'actions/users';
import { redirectToSignup } from 'actions/redirect';
export const initialUser = token => {
    return dispatch => {
        Login.getUser(token).then((user) =>{
            const { email, is_kyc_passed, roles} = user.data;
            //TODO добавить проверку роли и если "Админ" - запрерить перенаправление на дашборд
            dispatch(initIdenfified(is_kyc_passed));
            localStorage.setItem("roles", roles);
            dispatch(initEmail(email));
            dispatch(putToken(token));
            dispatch(putRoles(roles))
        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            dispatch(redirectToSignup());
        })
    }
};
