import { CHANGE_NEW_PASSWORD } from './types'


export const changeNewPassword = (e) => {
    return {
        type: CHANGE_NEW_PASSWORD,
        payload: e.target.value,
    }
};