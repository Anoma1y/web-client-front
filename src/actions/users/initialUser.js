import Login from 'libs/ApiLib/Login';
import { push } from 'react-router-redux';
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken,
    putRoles
} from 'actions/users';
import { redirectToSignup } from 'actions/redirect';

export const initialUser = token => {
    return (dispatch, getState) => {
        Login.getUser(token).then((user) =>{
            const { email, is_kyc_passed, roles} = user.data;
            dispatch(initIdenfified(is_kyc_passed));
            localStorage.setItem("roles", roles);
            dispatch(initEmail(email));
            dispatch(putToken(token));
            dispatch(putRoles(roles));
            const { pathname: PATH } = getState().routing.location;
            if (PATH === "/" || PATH === "/signup" || PATH === "/login") {
                dispatch(push('/dashboard'));
            }
        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            dispatch(redirectToSignup());
        })
    }
};
