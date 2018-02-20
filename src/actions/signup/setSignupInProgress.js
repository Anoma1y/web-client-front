import { SIGNUP_SET_SIGNUP_IN_PROGRESS } from './types'


export const setSignupInProgress = (e) => {
    return {
        type: SIGNUP_SET_SIGNUP_IN_PROGRESS,
        payload: e.target.value,
    }
};