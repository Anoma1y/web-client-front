import { CHANGE_EMAIL } from './types'

export const changeEmail = event => ({
    type: CHANGE_EMAIL,
    payload: event.target.value,
});