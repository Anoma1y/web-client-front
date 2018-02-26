import { SET_RESET_IN_PROGRESS } from './types'


export const setResetInProgress = value => {
    return {
        type: SET_RESET_IN_PROGRESS,
        payload: value,
    }
};