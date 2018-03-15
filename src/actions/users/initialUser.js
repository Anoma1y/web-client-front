import Login from 'libs/ApiLib/Login';
import { push } from 'react-router-redux';
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken,
    putRoles,
    initKycType
} from 'actions/users';
import { redirectToSignup } from 'actions/redirect';

export const initialUser = token => {
    return (dispatch, getState) => {
        Login.getUser(token).then((user) =>{
            const {
                email,
                is_kyc_passed,
                roles,
                kyc_type
            } = user.data;
            dispatch(initIdenfified(is_kyc_passed));
            localStorage.setItem("roles", roles);
            localStorage.setItem("kyc_type", kyc_type);
            dispatch(initEmail(email));
            dispatch(putToken(token));
            dispatch(putRoles(roles));
            dispatch(initKycType(kyc_type));
            const {
                pathname: PATH
            } = getState().routing.location;
            if (PATH === "/" || PATH === "/signup" || PATH === "/login") {
                dispatch(push('/dashboard'));
            }
        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            localStorage.removeItem("kyc_type");
            dispatch(redirectToSignup());
        })
    }
};
