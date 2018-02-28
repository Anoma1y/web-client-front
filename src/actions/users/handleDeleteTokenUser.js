import { deleteToken } from './deleteToken';
import Logout from 'libs/ApiLib/Logout'
import { push } from "react-router-redux";

export const handleDeleteTokenUser = value => {
    return dispatch => {
        Logout.logout(value).then(() => {
            localStorage.removeItem("jwt");
            dispatch(deleteToken());
            dispatch(push('/login'));
        }).catch(() => {
            console.log("Error");
        })
    }
};
