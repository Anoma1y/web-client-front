import { SET_AUTH_IN_PROGRESS } from './types'


export const setAuthInProgress = value => {
    return {
        type: SET_AUTH_IN_PROGRESS,
        payload: value,
    }
};