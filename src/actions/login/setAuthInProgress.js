import { LOGIN_SET_AUTH_IN_PROGRESS } from './types'


export const setAuthInProgress = (e) => {
    return {
        type: LOGIN_SET_AUTH_IN_PROGRESS,
        payload: e.target.value,
    }
};