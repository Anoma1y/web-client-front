import { CHANGE_PASSWORD } from './types'


export const changePassword = (e) => {
    return {
        type: CHANGE_PASSWORD,
        payload: e.target.value,
    }
};