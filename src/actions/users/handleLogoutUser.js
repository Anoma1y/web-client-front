import { resetState } from './resetState';
import Logout from 'libs/ApiLib/Logout'
import { push } from "react-router-redux";

export const handleLogoutUser = () => {
    return (dispatch, getState) => {
        const { jwt: TOKEN } = getState().user;
        Logout.logout(TOKEN).then(() => {
            dispatch(resetState());
            localStorage.clear();
            dispatch(push('/login'));
        }).catch(() => {
            dispatch(push('/'));
        })
    }
};
