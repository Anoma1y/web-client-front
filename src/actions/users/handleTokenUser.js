import {
    putToken,
    putRoles,
    initKycType
} from './';

export const handleTokenUser = value => {
    return dispatch => {
        const {
            jwt,
            roles,
            kyc_type,
            is_kyc_passed,
            email
        } = value;
        dispatch(putToken(jwt));
        dispatch(putRoles(roles));
        dispatch(initKycType(kyc_type));
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("is_kyc_passed", is_kyc_passed);
        localStorage.setItem("roles", roles);
        localStorage.setItem("kyc_type", kyc_type);
        localStorage.setItem("email", email);
    }
};

