import { SIGNUP_CHANGE_PASSWORD } from './types'


export const changePassword = (e) => {
    return {
        type: SIGNUP_CHANGE_PASSWORD,
        payload: e.target.value,
    }
};