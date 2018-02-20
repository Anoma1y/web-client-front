import { SIGNUP_CHANGE_REPEAT_PASSWORD } from './types'


export const changeRepeatPassword = (e) => {
    return {
        type: SIGNUP_CHANGE_REPEAT_PASSWORD,
        payload: e.target.value,
    }
};