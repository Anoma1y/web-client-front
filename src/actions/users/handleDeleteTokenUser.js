import { deleteToken } from './deleteToken';
import ApiLib from 'libs/ApiLib/Logout'
import { push } from "react-router-redux";
import { Redirect } from 'react-router';

export const handleDeleteTokenUser = value => {
    return dispatch => {
        ApiLib.logout(value).then(() => {
            localStorage.removeItem("jwt");
            dispatch(deleteToken());
            dispatch(push('/'));
        }).catch(() => {
            console.log("Error");
        })
    }
};
