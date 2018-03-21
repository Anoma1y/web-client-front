import { deleteToken } from './deleteToken';
import Logout from 'libs/ApiLib/Logout'
import { push } from "react-router-redux";

export const handleDeleteTokenUser = () => {
    return (dispatch, getState) => {
        const { jwt: TOKEN } = getState().user;
        Logout.logout(TOKEN).then(() => {
            dispatch(deleteToken());
            localStorage.clear();
            dispatch(push('/login'));
        }).catch(() => {
            dispatch(push('/'));
        })
    }
};
