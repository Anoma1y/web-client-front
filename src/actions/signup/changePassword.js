import { CHANGE_PASSWORD } from './types'

export const changePassword = value => ({
    type: CHANGE_PASSWORD,
    payload: value
});