import { LOGIN_CHANGE_EMAIL } from './types'


export const changeEmail = (e) => {
    return {
        type: LOGIN_CHANGE_EMAIL,
        payload: e.target.value,
    }
};