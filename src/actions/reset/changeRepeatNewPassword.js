import { CHANGE_REPEAT_NEW_PASSWORD } from './types'

export const changeRepeatNewPassword = value => ({
    type: CHANGE_REPEAT_NEW_PASSWORD,
    payload: value
});