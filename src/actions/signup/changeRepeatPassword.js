import { CHANGE_REPEAT_PASSWORD } from './types'

export const changeRepeatPassword = event => ({
    type: CHANGE_REPEAT_PASSWORD,
    payload: event.target.value,
});