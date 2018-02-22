import { SET_SIGNUP_IN_PROGRESS } from './types'


export const setSignupInProgress = (e) => {
    return {
        type: SET_SIGNUP_IN_PROGRESS,
        payload: e.target.value,
    }
};