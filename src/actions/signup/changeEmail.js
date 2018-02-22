import { CHANGE_EMAIL } from './types'


export const changeEmail = value => {
    return {
        type: CHANGE_EMAIL,
        payload: value,
    }
};