import { SIGNUP_CHANGE_EMAIL } from './types'


export const changeEmail = (e) => {
    return {
        type: SIGNUP_CHANGE_EMAIL,
        payload: e.target.value,
    }
};