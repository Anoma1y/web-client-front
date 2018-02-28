import { CHANGE_EMAIL } from './types'


export const changeEmail = value => ({
        type: CHANGE_EMAIL,
        payload: value
});