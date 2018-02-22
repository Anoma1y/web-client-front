import { CHANGE_REPEAT_NEW_PASSWORD } from './types'


export const changeRepeatNewPassword = (e) => {
    return {
        type: CHANGE_REPEAT_NEW_PASSWORD,
        payload: e.target.value,
    }
};