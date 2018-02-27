import { CHANGE_PASSWORD } from './types'

export const changePassword = (event) => ({
    type: CHANGE_PASSWORD,
    payload: event.target.value,
});