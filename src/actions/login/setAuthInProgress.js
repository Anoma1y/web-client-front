import { SET_AUTH_IN_PROGRESS } from './types'

export const setAuthInProgress = value => ({
    type: SET_AUTH_IN_PROGRESS,
    payload: value,
});