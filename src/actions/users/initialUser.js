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
import {
    initialUserFile,
    initialUserProfile,
    initialUserImage
} from 'actions/settings';
import { redirectToSignup } from 'actions/redirect';
import KYC from 'libs/ApiLib/KYC';

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

            localStorage.setItem("jwt", token);
            localStorage.setItem("is_kyc_passed", is_kyc_passed);
            localStorage.setItem("roles", roles);
            localStorage.setItem("kyc_type", kyc_type);
            localStorage.setItem("email", email);

            dispatch(initEmail(email));
            dispatch(putToken(token));
            dispatch(putRoles(roles));
            dispatch(initKycType(kyc_type));

            const {
                pathname: PATH
            } = getState().routing.location;

            KYC.getKYCById(token)
                .then((data) => {
                    const {
                        content,
                        type,
                        status
                    } = data.data;
                    if (type === 'individual') {
                        const INITIAL_DATA = JSON.parse(content);
                        dispatch(initialUserFile(INITIAL_DATA.individualUserFile));

                        dispatch(initialUserProfile(INITIAL_DATA.individualUserInformation));
                    }
                })
            // utilityBill
            // personalUserDocument
                .catch((err) => {
                    console.log(err);
                })

            if (PATH === "/" || PATH === "/signup" || PATH === "/login") {
                dispatch(push('/dashboard'));
            }

        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            localStorage.removeItem("email");
            localStorage.removeItem("is_kyc_passed");
            localStorage.removeItem("kyc_type");
            dispatch(redirectToSignup());
        })
    }
};
