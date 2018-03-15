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
            kyc_type
        } = value;
        dispatch(putToken(jwt));
        dispatch(putRoles(roles));
        dispatch(initKycType(kyc_type));
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("roles", roles);
        localStorage.setItem("kyc_type", kyc_type);
    }
};

