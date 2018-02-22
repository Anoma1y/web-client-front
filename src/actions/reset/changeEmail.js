import { CHANGE_EMAIL } from './types'


export const changeEmail = (e) => {
    return {
        type: CHANGE_EMAIL,
        payload: e.target.value,
    }
};