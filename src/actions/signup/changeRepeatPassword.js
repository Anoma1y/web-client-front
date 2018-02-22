import { CHANGE_REPEAT_PASSWORD } from './types'


export const changeRepeatPassword = (e) => {
    return {
        type: CHANGE_REPEAT_PASSWORD,
        payload: e.target.value,
    }
};