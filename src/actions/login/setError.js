import { LOGIN_SET_ERROR } from './types'


export const setError = (e) => {
    return {
        type: LOGIN_SET_ERROR,
        payload: e.target.value,
    }
};