import { deleteToken } from './deleteToken';
import Logout from 'libs/ApiLib/Logout'
import { push } from "react-router-redux";

export const handleDeleteTokenUser = value => {
    return dispatch => {
        Logout.logout(value).then(() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            localStorage.removeItem("email");
            localStorage.removeItem("is_kyc_passed");
            localStorage.removeItem("kyc_type")
            dispatch(deleteToken());
            dispatch(push('/login'));
        }).catch(() => {
            console.log("Error");
        })
    }
};
