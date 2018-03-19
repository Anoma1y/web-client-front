import { setError } from './setError'
import Login from 'libs/ApiLib/Login'
import { push } from "react-router-redux";
import { setAuthInProgress } from "./setAuthInProgress";
import {
    initialUser
} from 'actions/users';

export const handleLogin = value => {
    return dispatch => {
        const { 
            email, 
            password 
        } = value;
        dispatch(setAuthInProgress(true));
        Login.logUser(email, password).then((data) => {
            dispatch(setError(null));
            const {
                jwt
            } = data.data;
            Login.getUser(data.data.jwt).then((user) => {
                const {
                } = user.data;
                dispatch(initialUser(jwt));
                dispatch(setAuthInProgress(false));
                dispatch(push('/dashboard/'));
            });
        }).catch((err) =>{
            dispatch(setAuthInProgress(false));
            dispatch(setError(err));
        })
    }
};
