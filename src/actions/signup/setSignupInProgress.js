import { SET_SIGNUP_IN_PROGRESS } from './types'

export const setSignupInProgress = value => ({
    type: SET_SIGNUP_IN_PROGRESS,
    payload: value,
});