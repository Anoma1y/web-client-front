import { SET_SIGNUP_IN_PROGRESS } from './types'


export const setSignupInProgress = value => {
    return {
        type: SET_SIGNUP_IN_PROGRESS,
        payload: value,
    }
};