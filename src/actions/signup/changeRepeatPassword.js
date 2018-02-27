import { CHANGE_REPEAT_PASSWORD } from './types'

export const changeRepeatPassword = value => ({
    type: CHANGE_REPEAT_PASSWORD,
    payload: value
});