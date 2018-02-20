import { LOGIN_CHANGE_PASSWORD } from './types'


export const changePassword = (e) => {
    return {
        type: LOGIN_CHANGE_PASSWORD,
        payload: e.target.value,
    }
};