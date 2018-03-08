import { CHANGE_NEW_PASSWORD } from './types'

export const changeNewPassword =  value => ({
    type: CHANGE_NEW_PASSWORD,
    payload: value
});