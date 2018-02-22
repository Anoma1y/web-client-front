import { SET_RESET_IN_PROGRESS } from './types'


export const setResetInProgress = (e) => {
    return {
        type: SET_RESET_IN_PROGRESS,
        payload: e.target.value,
    }
};