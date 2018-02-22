import { SET_ERROR } from './types'


export const setError = (e) => {
    return {
        type: SET_ERROR,
        payload: e.target.value,
    }
};