import {
    putToken,
    putRoles
} from './';

export const handleTokenUser = value => {
    return dispatch => {
        const {
            jwt,
            roles
        } = value;
        dispatch(putToken(jwt));
        dispatch(putRoles(roles))
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("roles", roles);
    }
};

